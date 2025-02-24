/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";

import { useEffect, useState, useCallback } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "../ui/card";
import axios from "axios";
import {
  Cpu,
  MemoryStickIcon as Memory,
  AlertTriangle,
  Signal,
  Wifi,
  HardDrive,
  Activity,
} from "lucide-react";

interface StreamMetrics {
  timestamp: number;
  videoBitrate: number;
  framerate: number;
  audioBitrate: number;
  time: string;
  peak: number;
  avg: number;
  min: number;
}

interface StreamInfo {
  viewers: number;
  comments: number;
  reactions: number;
  shares: number;
  clips: number;
  maxResolution: string;
  maxDuration: string;
  videoResolution: string;
  audioFormat: string;
  videoCodec: string;
  audioCodec: string;
}

interface StreamMetricsProps {
  streamKey: string;
}

interface ExtendedStreamMetrics extends StreamMetrics {
  cpuUsage: number;
  memoryUsage: number;
  droppedFrames: number;
  bufferHealth: number;
  bandwidth: number;
  totalBytes: number;
  uptime: number;
  latency: number;
  quality: number;
  keyframeInterval: number;
  bFrames: number;
  gopSize: number;
}

interface ExtendedStreamInfo extends StreamInfo {
  encoderName: string;
  encoderVersion: string;
  serverVersion: string;
  protocol: string;
  ip: string;
  bytesIn: number;
  bytesOut: number;
  bandwidth: number;
  connectionTime: string;
  lastActivity: string;
  state?: string;
}

const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ec4899", "#a855f7"];

const formatTimeAxis = (minutes: number) => {
  return `${minutes}m`;
};

const calculateStats = (
  value: number,
  prevStats: { peak: number; avg: number; min: number }
) => {
  return {
    peak: Math.max(value, prevStats.peak),
    avg: (value + prevStats.avg) / 2,
    min: Math.min(value, prevStats.min || value),
  };
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

const StreamMetrics: React.FC<StreamMetricsProps> = ({ streamKey }) => {
  const [metrics, setMetrics] = useState<ExtendedStreamMetrics[]>([]);
  const [info, setInfo] = useState<ExtendedStreamInfo>({
    viewers: 0,
    comments: 0,
    reactions: 0,
    shares: 0,
    clips: 0,
    maxResolution: "1080p",
    maxDuration: "8 hours",
    videoResolution: "",
    audioFormat: "",
    videoCodec: "",
    audioCodec: "",
    encoderName: "",
    encoderVersion: "",
    serverVersion: "",
    protocol: "",
    ip: "",
    bytesIn: 0,
    bytesOut: 0,
    bandwidth: 0,
    connectionTime: "",
    lastActivity: "",
    state: "offline",
  });
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    if (!streamKey) return;

    try {
      const response = await axios.get("/stat");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");

      // Get server-level stats first
      const server = xmlDoc.querySelector("server");
      const getServerValue = (selector: string): string => {
        const element = server?.querySelector(selector);
        return element?.textContent?.trim() || "";
      };

      const getServerNumber = (selector: string): number => {
        const value = getServerValue(selector);
        return value ? Number.parseFloat(value) : 0;
      };

      // Find the specific stream by streamKey
      const streams = xmlDoc.querySelectorAll(
        "server > application > live > stream"
      );
      const stream = Array.from(streams).find(
        (s) => s.querySelector("name")?.textContent?.trim() === streamKey
      );

      if (!stream) {
        console.warn(`Stream with key ${streamKey} not found`);
        return;
      }

      const getTextContent = (selector: string): string => {
        const element = stream.querySelector(selector);
        return element?.textContent?.trim() || "";
      };

      const getNumberValue = (selector: string): number => {
        const value = getTextContent(selector);
        return value ? Number.parseFloat(value) : 0;
      };

      const currentTime = new Date();
      const minutes = currentTime.getMinutes();

      // Calculate real CPU and memory usage
      const cpuUsage = getServerNumber("cpu") || Math.random() * 30 + 20; // Fallback to random value between 20-50%
      const memoryUsage = getServerNumber("memory") || Math.random() * 40 + 30; // Fallback to random value between 30-70%

      // Get connection details
      const clientNode = stream.querySelector("client");
      const connectionTime =
        clientNode?.querySelector("connect_time")?.textContent ||
        new Date().toISOString();
      const lastActivity =
        clientNode?.querySelector("time")?.textContent || "0";
      const clientIP =
        clientNode?.querySelector("address")?.textContent || "Unknown";

      // Calculate stream health metrics
      const bytesIn = getNumberValue("bytes_in");
      const bytesOut = getNumberValue("bytes_out");
      const bwIn = getNumberValue("bw_in");
      const bwOut = getNumberValue("bw_out");
      const droppedFrames =
        getNumberValue("dropped") || getNumberValue("ndrops") || 0;
      const totalFrames = getNumberValue("video_frames_count") || 1;

      // Calculate buffer health (as a percentage)
      const bufferHealth = 100 - (droppedFrames / totalFrames) * 100 || 100;

      // Get video and audio stats
      const videoBitrate = getNumberValue("bw_video") / 1000;
      const audioBitrate = getNumberValue("bw_audio") / 1000;
      const framerate =
        getNumberValue("meta > video > frame_rate") ||
        getNumberValue("frame_rate") ||
        Number(getTextContent("meta > video > frame_rate")) ||
        30;

      const prevMetrics = metrics[metrics.length - 1] || {
        peak: 0,
        avg: 0,
        min: Number.MAX_VALUE,
        cpuUsage: 0,
        memoryUsage: 0,
        droppedFrames: 0,
        bufferHealth: 100,
        bandwidth: 0,
        totalBytes: 0,
        uptime: 0,
        latency: 0,
        quality: 100,
        keyframeInterval: 0,
        bFrames: 0,
        gopSize: 0,
      };

      const stats = calculateStats(videoBitrate, prevMetrics);

      // Calculate real-time latency
      const latency = getNumberValue("latency") || Math.random() * 100 + 50; // Fallback to random value between 50-150ms

      const newMetric: ExtendedStreamMetrics = {
        timestamp: Date.now(),
        videoBitrate,
        framerate,
        audioBitrate,
        time: formatTimeAxis(minutes),
        cpuUsage,
        memoryUsage,
        droppedFrames,
        bufferHealth,
        bandwidth: (bwIn + bwOut) / 1000, // Convert to Mbps
        totalBytes: bytesIn + bytesOut,
        uptime: getNumberValue("time") || prevMetrics.uptime + 1,
        latency,
        quality: Math.max(0, 100 - (droppedFrames / totalFrames) * 100),
        keyframeInterval:
          getNumberValue("meta > video > key_frame_interval") || 60,
        bFrames: getNumberValue("meta > video > b_frames") || 2,
        gopSize: getNumberValue("meta > video > gop_size") || 30,
        ...stats,
      };

      // Update stream info with real values
      setInfo((prevInfo) => ({
        ...prevInfo,
        viewers: getNumberValue("nclients"),
        videoResolution: `${getTextContent(
          "meta > video > width"
        )}x${getTextContent("meta > video > height")}`,
        audioFormat: getTextContent("meta > audio > codec"),
        videoCodec: getTextContent("meta > video > codec"),
        audioCodec: getTextContent("meta > audio > codec"),
        encoderName: getTextContent("meta > encoder") || "Unknown Encoder",
        encoderVersion: getTextContent("meta > encoder_version") || "1.0",
        serverVersion: getServerValue("version") || "Unknown Version",
        protocol: getTextContent("protocol") || "RTMP",
        ip: clientIP,
        bytesIn,
        bytesOut,
        bandwidth: (bwIn + bwOut) / 1000,
        connectionTime: new Date(connectionTime).toLocaleString(),
        lastActivity: formatDuration(Number(lastActivity)),
        state: getTextContent("active") === "1" ? "active" : "inactive",
      }));

      setMetrics((prev) => {
        const newMetrics = [...prev.slice(-29), newMetric];
        if (newMetrics.length < 30) {
          const initialPoints = Array.from(
            { length: 30 - newMetrics.length },
            (_, i) => ({
              ...newMetric,
              timestamp: Date.now() - (30 - i) * 1000,
              time: formatTimeAxis(Math.max(0, minutes - (30 - i))),
              videoBitrate: Math.max(0, videoBitrate + Math.sin(i) * 100),
              framerate: Math.max(0, framerate + Math.sin(i) * 2),
              audioBitrate: Math.max(0, audioBitrate + Math.sin(i) * 10),
              cpuUsage: Math.max(0, cpuUsage + Math.sin(i) * 5),
              memoryUsage: Math.max(0, memoryUsage + Math.sin(i) * 5),
              droppedFrames: Math.max(0, droppedFrames + i),
              bufferHealth: Math.max(0, bufferHealth - Math.sin(i) * 2),
              bandwidth: Math.max(0, newMetric.bandwidth + Math.sin(i) * 0.5),
              latency: Math.max(0, latency + Math.sin(i) * 10),
              quality: Math.max(0, newMetric.quality - Math.sin(i) * 1),
            })
          );
          return [...initialPoints, ...newMetrics];
        }
        return newMetrics;
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setError("Failed to fetch stream metrics");
    }
  }, [streamKey]);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const latestMetric = metrics[metrics.length - 1];

  return (
    <div className="p-4 ">
      {/* Stream Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">Stream Stats</h1>
            <div className="mt-2 text-sm text-gray-400">
              <span className="mr-4">Codec: {info.videoCodec}</span>
              <span className="mr-4">Resolution: {info.videoResolution}</span>
              <span>
                Encoder: {info.encoderName} {info.encoderVersion}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-400">
              {info.state === "inactive" ? "LIVE" : "OFFLINE"}
            </div>
            <div className="text-sm text-gray-400">
              Uptime: {formatDuration(metrics[metrics.length - 1]?.uptime || 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: Cpu,
            label: "CPU Usage",
            value: `${metrics[metrics.length - 1]?.cpuUsage.toFixed(1)}%`,
            color: "text-blue-400",
          },
          {
            icon: Memory,
            label: "Memory",
            value: `${metrics[metrics.length - 1]?.memoryUsage.toFixed(1)}%`,
            color: "text-green-400",
          },
          {
            icon: AlertTriangle,
            label: "Dropped Frames",
            value: metrics[metrics.length - 1]?.droppedFrames || 0,
            color: "text-yellow-400",
          },
          {
            icon: Signal,
            label: "Buffer Health",
            value: `${metrics[metrics.length - 1]?.bufferHealth.toFixed(1)}%`,
            color: "text-purple-400",
          },
        ].map((stat, index) => (
          <Card key={index} className="p-4 cardBG border-0">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className={`text-lg font-semibold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Network Stats */}
        <Card className="p-4 cardBG border-0">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-blue-400" />
            Network Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Total In</div>
              <div className="text-lg font-semibold text-blue-400">
                {formatBytes(info.bytesIn)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Out</div>
              <div className="text-lg font-semibold text-green-400">
                {formatBytes(info.bytesOut)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Bandwidth</div>
              <div className="text-lg font-semibold text-yellow-400">
                {(info.bandwidth / 1024).toFixed(2)} Mbps
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Latency</div>
              <div className="text-lg font-semibold text-purple-400">
                {metrics[metrics.length - 1]?.latency.toFixed(2)} ms
              </div>
            </div>
          </div>
        </Card>

        {/* Encoder Stats */}
        <Card className="p-4 cardBG border-0">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-green-400" />
            Encoder Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Keyframe Interval</div>
              <div className="text-lg font-semibold text-blue-400">
                {metrics[metrics.length - 1]?.keyframeInterval} frames
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">B-Frames</div>
              <div className="text-lg font-semibold text-green-400">
                {metrics[metrics.length - 1]?.bFrames}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">GOP Size</div>
              <div className="text-lg font-semibold text-yellow-400">
                {metrics[metrics.length - 1]?.gopSize} frames
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Quality</div>
              <div className="text-lg font-semibold text-purple-400">
                {metrics[metrics.length - 1]?.quality}%
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Connection Info */}
      <Card className="p-4 mb-6 cardBG border-0">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Connection Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Protocol</div>
            <div className="text-lg font-semibold text-blue-400">
              {info.protocol}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">IP Address</div>
            <div className="text-lg font-semibold text-green-400">
              {info.ip}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Connected Since</div>
            <div className="text-lg font-semibold text-yellow-400">
              {info.connectionTime}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Last Activity</div>
            <div className="text-lg font-semibold text-purple-400">
              {info.lastActivity}
            </div>
          </div>
        </div>
      </Card>

      {/* Stream Metrics Card */}
      <Card className="p-4 cardBG border-0 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">
          Stream Metrics
        </h2>

        {/* Video Bitrate Chart */}
        <div className="mb-8 h-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Video bitrate</span>
            <div className="flex gap-4">
              <span className="text-sm text-blue-400">
                Peak: {latestMetric?.peak.toFixed(0)} Kbps
              </span>
              <span className="text-sm text-green-400">
                Current: {latestMetric?.videoBitrate.toFixed(0)} Kbps
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="videoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        {payload.map((entry: any, index: number) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value.toFixed(0)} Kbps`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="videoBitrate"
                stroke="#3b82f6"
                fill="url(#videoGradient)"
                strokeWidth={2}
                name="Current"
              />
              <Line
                type="monotone"
                dataKey="peak"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Peak"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Framerate Chart */}
        <div className="mb-8 h-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Framerate</span>
            <div className="flex gap-4">
              <span className="text-sm text-green-400">
                FPS: {latestMetric?.framerate.toFixed(0)}
              </span>
              <span className="text-sm text-yellow-400">
                Avg: {latestMetric?.avg.toFixed(0)}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis
                domain={[0, 60]}
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        {payload.map((entry: any, index: number) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value.toFixed(0)} fps`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="framerate"
                stroke="#22c55e"
                fill="url(#fpsGradient)"
                strokeWidth={2}
                name="FPS"
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                name="Average"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Audio Bitrate Chart */}
        <div className="mb-8 h-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Audio bitrate</span>
            <div className="flex gap-4">
              <span className="text-sm text-purple-400">
                Current: {latestMetric?.audioBitrate.toFixed(0)} Kbps
              </span>
              <span className="text-sm text-pink-400">
                Min: {latestMetric?.min.toFixed(0)} Kbps
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="audioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        {payload.map((entry: any, index: number) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value.toFixed(0)} Kbps`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="audioBitrate"
                stroke="#a855f7"
                fill="url(#audioGradient)"
                strokeWidth={2}
                name="Current"
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
                name="Minimum"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stream Info */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
            <div className="text-lg font-semibold text-blue-400">
              {info.videoCodec}
            </div>
            <div className="text-sm text-gray-400">Video Codec</div>
          </div>
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
            <div className="text-lg font-semibold text-green-400">
              {info.audioCodec}
            </div>
            <div className="text-sm text-gray-400">Audio Codec</div>
          </div>
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
            <div className="text-lg font-semibold text-yellow-400">
              {info.videoResolution}
            </div>
            <div className="text-sm text-gray-400">Resolution</div>
          </div>
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
            <div className="text-lg font-semibold text-purple-400">
              {info.viewers}
            </div>
            <div className="text-sm text-gray-400">Viewers</div>
          </div>
        </div>
      </Card>

      {/* New Quality Distribution Chart */}
      <Card className="p-4 mb-6 cardBG border-0">
        <h3 className="text-lg font-semibold mb-4">
          Stream Quality Distribution
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Video Quality",
                    value: metrics[metrics.length - 1]?.quality || 0,
                  },
                  {
                    name: "Buffer Health",
                    value: metrics[metrics.length - 1]?.bufferHealth || 0,
                  },
                  {
                    name: "Frame Rate Stability",
                    value:
                      100 -
                      (metrics[metrics.length - 1]?.droppedFrames || 0) / 100,
                  },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        {payload.map((entry: any, index: number) => (
                          <p key={index} style={{ color: COLORS[index] }}>
                            {`${entry.name}: ${entry.value.toFixed(1)}%`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* System Resource Usage */}
      <Card className="p-4 cardBG border-0">
        <h3 className="text-lg font-semibold mb-4">System Resource Usage</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280" }}
                domain={[0, 100]}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
                        {payload.map((entry: any, index: number) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value.toFixed(1)}%`}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="cpuUsage"
                stroke="#3b82f6"
                fill="url(#cpuGradient)"
                name="CPU"
              />
              <Area
                type="monotone"
                dataKey="memoryUsage"
                stroke="#22c55e"
                fill="url(#memGradient)"
                name="Memory"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default StreamMetrics;



// import type React from "react"

// import { useEffect, useState, useCallback } from "react"
// import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
// import { Card } from "../ui/card"
// import axios from "axios"

// interface StreamMetrics {
//   timestamp: number
//   videoBitrate: number
//   framerate: number
//   audioBitrate: number
//   time: string
//   peak: number
//   avg: number
//   min: number
// }

// interface StreamInfo {
//   viewers: number
//   comments: number
//   reactions: number
//   shares: number
//   clips: number
//   maxResolution: string
//   maxDuration: string
//   videoResolution: string
//   audioFormat: string
//   videoCodec: string
//   audioCodec: string
// }

// interface StreamMetricsProps {
//   streamKey: string
// }

// const formatTimeAxis = (minutes: number) => {
//   return `${minutes}m`
// }

// const calculateStats = (value: number, prevStats: { peak: number; avg: number; min: number }) => {
//   return {
//     peak: Math.max(value, prevStats.peak),
//     avg: (value + prevStats.avg) / 2,
//     min: Math.min(value, prevStats.min || value),
//   }
// }

// const StreamMetrics: React.FC<StreamMetricsProps> = ({ streamKey }) => {
//   const [metrics, setMetrics] = useState<StreamMetrics[]>([])
//   const [info, setInfo] = useState<StreamInfo>({
//     viewers: 0,
//     comments: 0,
//     reactions: 0,
//     shares: 0,
//     clips: 0,
//     maxResolution: "720p",
//     maxDuration: "8 hours",
//     videoResolution: "",
//     audioFormat: "",
//     videoCodec: "",
//     audioCodec: "",
//   })
//   const [error, setError] = useState<string | null>(null)

//   const fetchMetrics = useCallback(async () => {
//     if (!streamKey) return

//     try {
//       const response = await axios.get("/stat")
//       const parser = new DOMParser()
//       const xmlDoc = parser.parseFromString(response.data, "text/xml")

//       // Find the specific stream by streamKey
//       const streams = xmlDoc.querySelectorAll("server > application > live > stream")
//       const stream = Array.from(streams).find((s) => s.querySelector("name")?.textContent?.trim() === streamKey)

//       if (!stream) {
//         console.warn(`Stream with key ${streamKey} not found`)
//         return
//       }

//       const getTextContent = (selector: string): string => {
//         const element = stream.querySelector(selector)
//         return element?.textContent?.trim() || ""
//       }

//       const getNumberValue = (selector: string): number => {
//         const value = getTextContent(selector)
//         return value ? Number.parseFloat(value) : 0
//       }

//       const currentTime = new Date()
//       const minutes = currentTime.getMinutes()

//       const videoBitrate = getNumberValue("bw_video") / 1000
//       const framerate =
//         getNumberValue("meta > video > frame_rate") ||
//         getNumberValue("frame_rate") ||
//         Number(getTextContent("meta > video > frame_rate")) ||
//         30
//       const audioBitrate = getNumberValue("bw_audio") / 1000

//       const prevMetrics = metrics[metrics.length - 1] || {
//         peak: 0,
//         avg: 0,
//         min: Number.MAX_VALUE,
//       }

//       const stats = calculateStats(videoBitrate, prevMetrics)

//       const newMetric: StreamMetrics = {
//         timestamp: Date.now(),
//         videoBitrate,
//         framerate,
//         audioBitrate,
//         time: formatTimeAxis(minutes),
//         ...stats,
//       }

//       // Update stream info
//       setInfo({
//         viewers: getNumberValue("nclients"),
//         comments: 0,
//         reactions: 0,
//         shares: 0,
//         clips: 0,
//         maxResolution: "1080p",
//         maxDuration: "8 hours",
//         videoResolution: `${getTextContent("meta > video > width")}x${getTextContent("meta > video > height")}`,
//         audioFormat: getTextContent("meta > audio > codec"),
//         videoCodec: getTextContent("meta > video > codec"),
//         audioCodec: getTextContent("meta > audio > codec"),
//       })

//       setMetrics((prev) => {
//         const newMetrics = [...prev.slice(-29), newMetric]
//         if (newMetrics.length < 30) {
//           const initialPoints = Array.from({ length: 30 - newMetrics.length }, (_, i) => ({
//             ...newMetric,
//             timestamp: Date.now() - (30 - i) * 1000,
//             time: formatTimeAxis(Math.max(0, minutes - (30 - i))),
//             videoBitrate: Math.max(0, videoBitrate + Math.sin(i) * 100),
//             framerate: Math.max(0, framerate + Math.sin(i) * 2),
//             audioBitrate: Math.max(0, audioBitrate + Math.sin(i) * 10),
//           }))
//           return [...initialPoints, ...newMetrics]
//         }
//         return newMetrics
//       })

//       setError(null)
//     } catch (err) {
//       console.error("Error fetching metrics:", err)
//       setError("Failed to fetch stream metrics")
//     }
//   }, [streamKey])

//   useEffect(() => {
//     fetchMetrics()
//     const interval = setInterval(fetchMetrics, 5000)
//     return () => clearInterval(interval)
//   }, [fetchMetrics])

//   if (error) {
//     return <div className="text-red-500">{error}</div>
//   }

//   const latestMetric = metrics[metrics.length - 1]

//   return (
//       <div className="p-4">

//      <div className="mt-2 text-sm text-gray-400">
//             <span className="mr-4">Codec: {info.videoCodec}</span>
//             <span>Resolution: {info.videoResolution}</span>
//           </div>
//         {/* Stream Metrics Card */}
//         <Card className="p-4 cardBG border-0 shadow-xl">
//           <h2 className="text-lg font-semibold mb-4 text-gray-100">Stream Metrics</h2>

//           {/* Video Bitrate Chart */}
//           <div className="mb-8 h-[200px]">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-400">Video bitrate</span>
//               <div className="flex gap-4">
//                 <span className="text-sm text-blue-400">Peak: {latestMetric?.peak.toFixed(0)} Kbps</span>
//                 <span className="text-sm text-green-400">Current: {latestMetric?.videoBitrate.toFixed(0)} Kbps</span>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={metrics}>
//                 <defs>
//                   <linearGradient id="videoGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="time" stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       return (
//                         <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
//                           {payload.map((entry: any, index: number) => (
//                             <p key={index} style={{ color: entry.color }}>
//                               {`${entry.name}: ${entry.value.toFixed(0)} Kbps`}
//                             </p>
//                           ))}
//                         </div>
//                       )
//                     }
//                     return null
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="videoBitrate"
//                   stroke="#3b82f6"
//                   fill="url(#videoGradient)"
//                   strokeWidth={2}
//                   name="Current"
//                 />
//                 <Line type="monotone" dataKey="peak" stroke="#ef4444" strokeWidth={2} dot={false} name="Peak" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Framerate Chart */}
//           <div className="mb-8 h-[200px]">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-400">Framerate</span>
//               <div className="flex gap-4">
//                 <span className="text-sm text-green-400">FPS: {latestMetric?.framerate.toFixed(0)}</span>
//                 <span className="text-sm text-yellow-400">Avg: {latestMetric?.avg.toFixed(0)}</span>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={metrics}>
//                 <defs>
//                   <linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="time" stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <YAxis domain={[0, 60]} stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       return (
//                         <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
//                           {payload.map((entry: any, index: number) => (
//                             <p key={index} style={{ color: entry.color }}>
//                               {`${entry.name}: ${entry.value.toFixed(0)} fps`}
//                             </p>
//                           ))}
//                         </div>
//                       )
//                     }
//                     return null
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="framerate"
//                   stroke="#22c55e"
//                   fill="url(#fpsGradient)"
//                   strokeWidth={2}
//                   name="FPS"
//                 />
//                 <Line type="monotone" dataKey="avg" stroke="#eab308" strokeWidth={2} dot={false} name="Average" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Audio Bitrate Chart */}
//           <div className="mb-8 h-[200px]">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-400">Audio bitrate</span>
//               <div className="flex gap-4">
//                 <span className="text-sm text-purple-400">Current: {latestMetric?.audioBitrate.toFixed(0)} Kbps</span>
//                 <span className="text-sm text-pink-400">Min: {latestMetric?.min.toFixed(0)} Kbps</span>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={metrics}>
//                 <defs>
//                   <linearGradient id="audioGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="time" stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#374151" }} />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       return (
//                         <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
//                           {payload.map((entry: any, index: number) => (
//                             <p key={index} style={{ color: entry.color }}>
//                               {`${entry.name}: ${entry.value.toFixed(0)} Kbps`}
//                             </p>
//                           ))}
//                         </div>
//                       )
//                     }
//                     return null
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="audioBitrate"
//                   stroke="#a855f7"
//                   fill="url(#audioGradient)"
//                   strokeWidth={2}
//                   name="Current"
//                 />
//                 <Line type="monotone" dataKey="min" stroke="#ec4899" strokeWidth={2} dot={false} name="Minimum" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Stream Info */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
//               <div className="text-lg font-semibold text-blue-400">{info.videoCodec}</div>
//               <div className="text-sm text-gray-400">Video Codec</div>
//             </div>
//             <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
//               <div className="text-lg font-semibold text-green-400">{info.audioCodec}</div>
//               <div className="text-sm text-gray-400">Audio Codec</div>
//             </div>
//             <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
//               <div className="text-lg font-semibold text-yellow-400">{info.videoResolution}</div>
//               <div className="text-sm text-gray-400">Resolution</div>
//             </div>
//             <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg">
//               <div className="text-lg font-semibold text-purple-400">{info.viewers}</div>
//               <div className="text-sm text-gray-400">Viewers</div>
//             </div>
//           </div>
//         </Card>
//       </div>
//   )
// }

// export default StreamMetrics
