import type React from "react"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Loader2 } from "lucide-react"

interface StreamData {
  streamKey: string
  clients: number
  video: {
    codec: string
    profile: string
    level: string
    bitrate: number
    width: number
    height: number
    fps: number
  }
  audio: {
    codec: string
    bitrate: number
    frequency: number
    channels: number
  }
  inBytes: number
  outBytes: number
  inBits: number
  outBits: number
  state: string
  time: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const parseSize = (size: string): { width: number; height: number } => {
  const [width, height] = (size || "").split("x").map(Number)
  return { width: width || 0, height: height || 0 }
}

const parseBitrate = (bitrate: string): number => {
  const value = Number.parseFloat(bitrate || "0")
  const unit = (bitrate || "").toLowerCase()
  if (unit.includes("mb/s")) return value
  if (unit.includes("kb/s")) return value / 1000
  return value / 1000000 // Assume bps if no unit specified
}

const parseTime = (time: string): number => {
  if (time.includes("m")) {
    const [minutes, seconds] = time.split("m")
    return Number.parseInt(minutes) * 60 + Number.parseInt(seconds)
  }
  return Number.parseInt(time)
}

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

const StreamStats: React.FC = () => {
  const [streams, setStreams] = useState<{ [key: string]: StreamData[] }>({})
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get("/stat", {
        timeout: 5000,
        responseType: "text",
      })
      const xmlData = response.data

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlData, "text/xml")

      const server = xmlDoc.querySelector("server")
      if (!server) throw new Error("Invalid XML structure: server element not found")

      const getTextContent = (selector: string, parent: Element): string =>
        parent.querySelector(selector)?.textContent?.trim() || ""

      const getNumberContent = (selector: string, parent: Element): number =>
        Number.parseFloat(getTextContent(selector, parent)) || 0

      const streamElements = server.querySelectorAll("application > live > stream")
      const newStreams: { [key: string]: StreamData[] } = {}

      streamElements.forEach((stream) => {
        const streamKey = getTextContent("name", stream)
        const [codec, profile, level] = getTextContent("meta > video > codec", stream).split(" ")
        const parsedData: StreamData = {
          streamKey,
          clients: getNumberContent("nclients", stream),
          video: {
            codec,
            profile,
            level,
            bitrate: parseBitrate(getTextContent("bw_video", stream)),
            ...parseSize(
              getTextContent("meta > video > width", stream) + "x" + getTextContent("meta > video > height", stream),
            ),
            fps: getNumberContent("meta > video > frame_rate", stream),
          },
          audio: {
            codec: getTextContent("meta > audio > codec", stream),
            bitrate: parseBitrate(getTextContent("bw_audio", stream)),
            frequency: getNumberContent("meta > audio > sample_rate", stream),
            channels: getNumberContent("meta > audio > channels", stream),
          },
          inBytes: getNumberContent("bytes_in", stream),
          outBytes: getNumberContent("bytes_out", stream),
          inBits: parseBitrate(getTextContent("bw_in", stream)),
          outBits: parseBitrate(getTextContent("bw_out", stream)),
          state: getTextContent("active", stream) ? "Active" : "Inactive",
          time: parseTime(getTextContent("time", stream)),
        }

        if (!newStreams[streamKey]) {
          newStreams[streamKey] = []
        }
        newStreams[streamKey] = [...newStreams[streamKey].slice(-19), parsedData]
      })

      console.log({newStreams})
      setStreams(newStreams)
      if (!selectedStream && Object.keys(newStreams).length > 0) {
        setSelectedStream(Object.keys(newStreams)[0])
      }
      setError(null)
    } catch (error) {
      console.error("Error fetching stats:", error)
      setError("Failed to fetch stream statistics. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [selectedStream])

  useEffect(() => {
    fetchStats()
    // const interval = setInterval(fetchStats, 2000)
    // return () => clearInterval(interval)
    fetchStats()
  }, [fetchStats])

  const currentStreamData = selectedStream ? streams[selectedStream] : []
  const latestData = currentStreamData[currentStreamData.length - 1]

  if (loading && Object.keys(streams).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading stream statistics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <Button onClick={fetchStats}>Retry</Button>
      </div>
    )
  }

  return (
    <ScrollArea className="w-full h-full">
      <div className="p-5 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">📊 Stream Statistics (Real-Time)</h2>

        <div className="mb-4">
          <Select value={selectedStream || undefined} onValueChange={(value) => setSelectedStream(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a stream" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(streams).map((streamKey) => (
                <SelectItem key={streamKey} value={streamKey}>
                  {streamKey}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {latestData && (
          <>
            {/* 1️⃣ Bitrate Over Time */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Bitrate Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentStreamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => formatTime(value)} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} Mb/s`} />
                  <Legend />
                  <Line type="monotone" dataKey="inBits" name="In Bitrate" stroke="#8884d8" />
                  <Line type="monotone" dataKey="outBits" name="Out Bitrate" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 2️⃣ Video/Audio Bandwidth Distribution */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Video/Audio Bandwidth Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Video", value: latestData.video.bitrate },
                      { name: "Audio", value: latestData.audio.bitrate },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} Mb/s`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 3️⃣ Clients and FPS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Clients and FPS</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentStreamData.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => formatTime(value)} />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="clients" fill="#8884d8" name="Clients" />
                  <Bar yAxisId="right" dataKey="video.fps" fill="#82ca9d" name="FPS" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 4️⃣ Data Transfer */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Data Transfer</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentStreamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => formatTime(value)} />
                  <YAxis tickFormatter={(value) => formatBytes(value)} />
                  <Tooltip formatter={(value) => formatBytes(value as number)} />
                  <Legend />
                  <Area type="monotone" dataKey="inBytes" stackId="1" stroke="#8884d8" fill="#8884d8" name="In Bytes" />
                  <Area
                    type="monotone"
                    dataKey="outBytes"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Out Bytes"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 5️⃣ Stream Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Video</h4>
                <p>
                  Codec: {latestData.video.codec} {latestData.video.profile} {latestData.video.level}
                </p>
                <p>Bitrate: {latestData.video.bitrate.toFixed(2)} Mb/s</p>
                <p>
                  Resolution: {latestData.video.width}x{latestData.video.height}
                </p>
                <p>FPS: {latestData.video.fps}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Audio</h4>
                <p>Codec: {latestData.audio.codec}</p>
                <p>Bitrate: {latestData.audio.bitrate.toFixed(2)} Mb/s</p>
                <p>Frequency: {latestData.audio.frequency} Hz</p>
                <p>Channels: {latestData.audio.channels}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Stream Status</h4>
                <p>State: {latestData.state}</p>
                <p>Time: {formatTime(latestData.time)}</p>
                <p>Clients: {latestData.clients}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Data Transfer</h4>
                <p>In: {formatBytes(latestData.inBytes)}</p>
                <p>Out: {formatBytes(latestData.outBytes)}</p>
                <p>In Bitrate: {latestData.inBits.toFixed(2)} Mb/s</p>
                <p>Out Bitrate: {latestData.outBits.toFixed(2)} Mb/s</p>
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  )
}

export default StreamStats

