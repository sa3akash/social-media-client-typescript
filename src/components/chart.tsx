"use client"

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
import { Loader2 } from "lucide-react"

interface StreamData {
  video: {
    codec: string
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
  clients: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const parseSize = (size: string): { width: number; height: number } => {
  const [width, height] = (size || "").split("X").map(Number)
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
  const [minutes, seconds] = (time || "0m 0s").split("m ")
  return (Number.parseInt(minutes) || 0) * 60 + Number.parseInt(seconds)
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
  const [data, setData] = useState<StreamData[]>([])
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

      const getTextContent = (selector: string, parent = server): string =>
        parent.querySelector(selector)?.textContent?.trim() || ""

      const getNumberContent = (selector: string, parent = server): number =>
        Number.parseFloat(getTextContent(selector, parent)) || 0

      const stream = server.querySelector("application > live > stream")
      if (!stream) throw new Error("No active stream found")

      const parsedData: StreamData = {
        video: {
          codec: getTextContent("meta > video > codec", stream),
          bitrate: parseBitrate(getTextContent("bw_video", stream)),
          ...parseSize(
            getTextContent("meta > video > width", stream) + "X" + getTextContent("meta > video > height", stream),
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
        time: getNumberContent("time", stream),
        clients: getNumberContent("nclients", stream),
      }

      setData((prevData) => [...prevData.slice(-20), parsedData])
      setError(null)
    } catch (error) {
      console.error("Error fetching stats:", error)
      setError("Failed to fetch stream statistics. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 2000)
    return () => clearInterval(interval)
  }, [fetchStats])

  const latestData = data[data.length - 1]

  if (loading && data.length === 0) {
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

        {/* 1️⃣ Bitrate Over Time */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Bitrate Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={(value) => formatTime(value)} />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toFixed(2)} Mb/s`} />
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
                  { name: "Video", value: latestData?.video.bitrate || 0 },
                  { name: "Audio", value: latestData?.audio.bitrate || 0 },
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
              <Tooltip formatter={(value) => `${value.toFixed(2)} Mb/s`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3️⃣ Clients and FPS */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Clients and FPS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.slice(-10)}>
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
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={(value) => formatTime(value)} />
              <YAxis tickFormatter={(value) => formatBytes(value)} />
              <Tooltip formatter={(value) => formatBytes(value as number)} />
              <Legend />
              <Area type="monotone" dataKey="inBytes" stackId="1" stroke="#8884d8" fill="#8884d8" name="In Bytes" />
              <Area type="monotone" dataKey="outBytes" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Out Bytes" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 5️⃣ Stream Information */}
        {latestData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Video</h4>
              <p>Codec: {latestData.video.codec}</p>
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
        )}
      </div>
    </ScrollArea>
  )
}

export default StreamStats






















// import type React from "react"
// import { useEffect, useState, useCallback } from "react"
// import axios from "axios"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
// } from "recharts"
// import { ScrollArea } from "./ui/scroll-area"
// import { Button } from "./ui/button"
// import { Loader2 } from "lucide-react"

// interface StreamData {
//   video: {
//     codec: string
//     bitrate: number
//     width: number
//     height: number
//     fps: number
//   }
//   audio: {
//     codec: string
//     bitrate: number
//     frequency: number
//     channels: number
//   }
//   inBytes: number
//   outBytes: number
//   inBits: number
//   outBits: number
//   state: string
//   time: number
//   clients: number
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// const parseSize = (size: string): { width: number; height: number } => {
//   const [width, height] = (size || "").split("x").map(Number)
//   return { width: width || 0, height: height || 0 }
// }

// const parseBitrate = (bitrate: string): number => {
//   const value = Number.parseFloat(bitrate || "0")
//   const unit = (bitrate || "").slice(-4)
//   return unit === "Mb/s" ? value : value / 1000
// }

// const parseTime = (time: string): number => {
//   const [minutes, seconds] = (time || "0m 0s").split("m ")
//   return (Number.parseInt(minutes) || 0) * 60 + (Number.parseInt(seconds) || 0)
// }

// const formatBytes = (bytes: number, decimals = 2): string => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const dm = decimals < 0 ? 0 : decimals
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
// }

// const StreamStats: React.FC = () => {
//   const [data, setData] = useState<StreamData[]>([])
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)

//   const fetchStats = useCallback(async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get("/stat", {
//         timeout: 5000,
//         responseType: "text",
//       })
//       const xmlData = response.data

//       const parser = new DOMParser()
//       const xmlDoc = parser.parseFromString(xmlData, "text/xml")

//       const server = xmlDoc.querySelector("server")
//       if (!server) throw new Error("Invalid XML structure: server element not found")

//       const getTextContent = (selector: string, parent = server): string =>
//         parent.querySelector(selector)?.textContent?.trim() || ""

//       const getNumberContent = (selector: string, parent = server): number =>
//         Number.parseFloat(getTextContent(selector, parent)) || 0

//       const stream = server.querySelector("application > live > stream")
//       if (!stream) throw new Error("No active stream found")

//       const parsedData: StreamData = {
//         video: {
//           codec: getTextContent("meta > video > codec", stream),
//           bitrate: getNumberContent("bw_video", stream) / 1024, // Convert to Mb/s
//           ...parseSize(
//             getTextContent("meta > video > width", stream) + "x" + getTextContent("meta > video > height", stream),
//           ),
//           fps: getNumberContent("meta > video > frame_rate", stream),
//         },
//         audio: {
//           codec: getTextContent("meta > audio > codec", stream),
//           bitrate: getNumberContent("bw_audio", stream) / 1024, // Convert to Mb/s
//           frequency: getNumberContent("meta > audio > sample_rate", stream),
//           channels: getNumberContent("meta > audio > channels", stream),
//         },
//         inBytes: getNumberContent("bytes_in", stream),
//         outBytes: getNumberContent("bytes_out", stream),
//         inBits: getNumberContent("bw_in", stream) / 1024, // Convert to Mb/s
//         outBits: getNumberContent("bw_out", stream) / 1024, // Convert to Mb/s
//         state: getTextContent("active", stream) ? "Active" : "Inactive",
//         time: getNumberContent("time", stream),
//         clients: getNumberContent("nclients", stream),
//       }

//       setData((prevData) => [...prevData.slice(-20), parsedData])
//       setError(null)
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//       setError("Failed to fetch stream statistics. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     fetchStats()
//     const interval = setInterval(fetchStats, 2000)
//     return () => clearInterval(interval)
//   }, [fetchStats])

//   const latestData = data[data.length - 1]

//   if (loading && data.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
//         <Loader2 className="mr-2 h-8 w-8 animate-spin" />
//         <span>Loading stream statistics...</span>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p className="mb-4">{error}</p>
//         <Button onClick={fetchStats}>Retry</Button>
//       </div>
//     )
//   }

//   return (
//     <ScrollArea className="w-full h-full">
//       <div className="p-5 bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">📊 Stream Statistics (Real-Time)</h2>

//         {/* 1️⃣ Bitrate Over Time */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Bitrate Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="inBits" name="In Bitrate (Mb/s)" stroke="#8884d8" />
//               <Line type="monotone" dataKey="outBits" name="Out Bitrate (Mb/s)" stroke="#82ca9d" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 2️⃣ Bandwidth Distribution */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Bandwidth Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Video", value: latestData?.video.bitrate || 0 },
//                   { name: "Audio", value: latestData?.audio.bitrate || 0 },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {COLORS.map((color, index) => (
//                   <Cell key={`cell-${index}`} fill={color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 3️⃣ Clients and FPS */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Clients and FPS</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.slice(-10)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//               <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//               <Tooltip />
//               <Legend />
//               <Bar yAxisId="left" dataKey="clients" fill="#8884d8" name="Clients" />
//               <Bar yAxisId="right" dataKey="video.fps" fill="#82ca9d" name="FPS" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 4️⃣ Data Transfer */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Data Transfer</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis tickFormatter={(value) => formatBytes(value)} />
//               <Tooltip formatter={(value) => formatBytes(value as number)} />
//               <Legend />
//               <Area type="monotone" dataKey="inBytes" stackId="1" stroke="#8884d8" fill="#8884d8" name="In Bytes" />
//               <Area type="monotone" dataKey="outBytes" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Out Bytes" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 5️⃣ Stream Information */}
//         {latestData && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Video</h4>
//               <p>Codec: {latestData.video.codec}</p>
//               <p>Bitrate: {latestData.video.bitrate.toFixed(2)} Mb/s</p>
//               <p>
//                 Resolution: {latestData.video.width}x{latestData.video.height}
//               </p>
//               <p>FPS: {latestData.video.fps}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Audio</h4>
//               <p>Codec: {latestData.audio.codec}</p>
//               <p>Bitrate: {latestData.audio.bitrate.toFixed(2)} Mb/s</p>
//               <p>Frequency: {latestData.audio.frequency} Hz</p>
//               <p>Channels: {latestData.audio.channels}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Stream Status</h4>
//               <p>State: {latestData.state}</p>
//               <p>
//                 Time: {Math.floor(latestData.time / 60)}m {latestData.time % 60}s
//               </p>
//               <p>Clients: {latestData.clients}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Data Transfer</h4>
//               <p>In: {formatBytes(latestData.inBytes)}</p>
//               <p>Out: {formatBytes(latestData.outBytes)}</p>
//               <p>In Bitrate: {latestData.inBits.toFixed(2)} Mb/s</p>
//               <p>Out Bitrate: {latestData.outBits.toFixed(2)} Mb/s</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </ScrollArea>
//   )
// }

// export default StreamStats

















// import type React from "react"
// import { useEffect, useState, useCallback } from "react"
// import axios from "axios"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
// } from "recharts"
// import { ScrollArea } from "./ui/scroll-area"

// interface StreamData {
//   video: {
//     codec: string
//     bitrate: number
//     width: number
//     height: number
//     fps: number
//   }
//   audio: {
//     codec: string
//     bitrate: number
//     frequency: number
//     channels: number
//   }
//   inBytes: number
//   outBytes: number
//   inBits: number
//   outBits: number
//   state: string
//   time: number
//   clients: number
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// const parseSize = (size: string): { width: number; height: number } => {
//   const [width, height] = (size || "").split("X").map(Number)
//   return { width: width || 0, height: height || 0 }
// }

// const parseBitrate = (bitrate: string): number => {
//   const value = Number.parseFloat(bitrate || "0")
//   const unit = (bitrate || "").slice(-4)
//   return unit === "Mb/s" ? value : value / 1000
// }

// const parseTime = (time: string): number => {
//   const [minutes, seconds] = (time || "0m 0s").split("m ")
//   return (Number.parseInt(minutes) || 0) * 60 + (Number.parseInt(seconds) || 0)
// }

// const formatBytes = (bytes: number, decimals = 2): string => {
//   if (bytes === 0) return "0 Bytes"
//   const k = 1024
//   const dm = decimals < 0 ? 0 : decimals
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
//   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
// }

// const StreamStats: React.FC = () => {
//   const [data, setData] = useState<StreamData[]>([])
//   const [error, setError] = useState<string | null>(null)

//   const fetchStats = useCallback(async () => {
//     try {
//       const response = await axios.get("/stat")
//       const rawData = response.data // Assume this is the raw data structure you provided

//       if (!rawData || typeof rawData !== "object") {
//         throw new Error("Invalid data received from server")
//       }

//       const parsedData: StreamData = {
//         video: {
//           codec: rawData.video?.codec || "Unknown",
//           bitrate: parseBitrate(rawData.video?.Bit || "0"),
//           ...parseSize(rawData.video?.size || "0x0"),
//           fps: Number.parseInt(rawData.video?.fps || "0"),
//         },
//         audio: {
//           codec: rawData.audio?.codec || "Unknown",
//           bitrate: parseBitrate(rawData.audio?.Bit || "0"),
//           frequency: Number.parseInt(rawData.audio?.freq || "0"),
//           channels: Number.parseInt(rawData.audio?.chan || "0"),
//         },
//         inBytes: Number.parseFloat(rawData.in_bytes || "0") * 1024 * 1024 * 1024, // Convert GB to bytes
//         outBytes: Number.parseFloat(rawData.out_bytes || "0") * 1024 * 1024, // Convert MB to bytes
//         inBits: parseBitrate(rawData.in_bits || "0") * 1024 * 1024, // Convert MB/s to bits/s
//         outBits: parseBitrate(rawData.out_bites || "0") * 1024 * 1024, // Convert Mb/s to bits/s
//         state: rawData.state || "Unknown",
//         time: parseTime(rawData.time || "0m 0s"),
//         clients: Number.parseInt(rawData.clients || "0"),
//       }

//       setData((prevData) => [...prevData.slice(-20), parsedData])
//       setError(null)
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//       setError("Failed to fetch stream statistics. Please try again later.")
//     }
//   }, [])

//   useEffect(() => {
//     fetchStats()
//     const interval = setInterval(fetchStats, 2000)
//     return () => clearInterval(interval)
//   }, [fetchStats])

//   const latestData = data[data.length - 1]

//   if (error) {
//     return (
//       <div className="p-5 bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p>{error}</p>
//       </div>
//     )
//   }

//   return (
//     <ScrollArea className="w-full h-full">
//       <div className="p-5 bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">📊 Stream Statistics (Real-Time)</h2>

//         {/* 1️⃣ Bitrate Over Time */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Bitrate Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="inBits" name="In Bitrate (Mb/s)" stroke="#8884d8" />
//               <Line type="monotone" dataKey="outBits" name="Out Bitrate (Mb/s)" stroke="#82ca9d" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 2️⃣ Bandwidth Distribution */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Bandwidth Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Video", value: latestData?.video.bitrate || 0 },
//                   { name: "Audio", value: latestData?.audio.bitrate || 0 },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {COLORS.map((color, index) => (
//                   <Cell key={`cell-${index}`} fill={color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 3️⃣ Clients and FPS */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Clients and FPS</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.slice(-10)}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//               <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//               <Tooltip />
//               <Legend />
//               <Bar yAxisId="left" dataKey="clients" fill="#8884d8" name="Clients" />
//               <Bar yAxisId="right" dataKey="video.fps" fill="#82ca9d" name="FPS" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 4️⃣ Data Transfer */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Data Transfer</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="time"
//                 tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
//               />
//               <YAxis tickFormatter={(value) => formatBytes(value)} />
//               <Tooltip formatter={(value) => formatBytes(value as number)} />
//               <Legend />
//               <Area type="monotone" dataKey="inBytes" stackId="1" stroke="#8884d8" fill="#8884d8" name="In Bytes" />
//               <Area type="monotone" dataKey="outBytes" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Out Bytes" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 5️⃣ Stream Information */}
//         {latestData && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Video</h4>
//               <p>Codec: {latestData.video.codec}</p>
//               <p>Bitrate: {latestData.video.bitrate.toFixed(2)} Mb/s</p>
//               <p>
//                 Resolution: {latestData.video.width}x{latestData.video.height}
//               </p>
//               <p>FPS: {latestData.video.fps}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Audio</h4>
//               <p>Codec: {latestData.audio.codec}</p>
//               <p>Bitrate: {latestData.audio.bitrate.toFixed(2)} Mb/s</p>
//               <p>Frequency: {latestData.audio.frequency} Hz</p>
//               <p>Channels: {latestData.audio.channels}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Stream Status</h4>
//               <p>State: {latestData.state}</p>
//               <p>
//                 Time: {Math.floor(latestData.time / 60)}m {latestData.time % 60}s
//               </p>
//               <p>Clients: {latestData.clients}</p>
//             </div>
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h4 className="text-lg font-semibold mb-2">Data Transfer</h4>
//               <p>In: {formatBytes(latestData.inBytes)}</p>
//               <p>Out: {formatBytes(latestData.outBytes)}</p>
//               <p>In Bitrate: {(latestData.inBits / 1024 / 1024).toFixed(2)} Mb/s</p>
//               <p>Out Bitrate: {(latestData.outBits / 1024 / 1024).toFixed(2)} Mb/s</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </ScrollArea>
//   )
// }

// export default StreamStats






















// import type React from "react"
// import { useEffect, useState, useCallback } from "react"
// import axios from "axios"
// import {
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
// } from "recharts"
// import { ScrollArea } from "./ui/scroll-area"

// interface StreamData {
//   name: string
//   bw_in: number
//   bw_out: number
//   bw_audio: number
//   bw_video: number
//   nclients: number
//   time: number
//   meta: {
//     video: {
//       width: number
//       height: number
//       frame_rate: number
//       codec: string
//     }
//     audio: {
//       codec: string
//       sample_rate: number
//       channels: number
//     }
//   }
// }

// interface AggregatedData {
//   timestamp: string
//   total_bw_in: number
//   total_bw_out: number
//   total_clients: number
//   streams: StreamData[]
// }

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// const StreamStats: React.FC = () => {
//   const [data, setData] = useState<AggregatedData[]>([])

//   const fetchStats = useCallback(async () => {
//     try {
//       const response = await axios.get("/stat")
//       const parser = new DOMParser()
//       const xmlDoc = parser.parseFromString(response.data, "text/xml")

//       const server = xmlDoc.querySelector("server")
//       if (!server) return

//       const getNumber = (selector: string, element = server): number =>
//         Number.parseFloat(element.querySelector(selector)?.textContent || "0") || 0
//       const getText = (selector: string, element = server): string =>
//         element.querySelector(selector)?.textContent?.trim() || "Unknown"

//       const streams: StreamData[] = Array.from(server.querySelectorAll("application > live > stream")).map(
//         (stream) => ({
//           name: getText("name", stream),
//           bw_in: getNumber("bw_in", stream) / 1024, // Convert to Kbps
//           bw_out: getNumber("bw_out", stream) / 1024, // Convert to Kbps
//           bw_audio: getNumber("bw_audio", stream) / 1024, // Convert to Kbps
//           bw_video: getNumber("bw_video", stream) / 1024, // Convert to Kbps
//           nclients: getNumber("nclients", stream),
//           time: getNumber("time", stream),
//           meta: {
//             video: {
//               width: getNumber("meta > video > width", stream),
//               height: getNumber("meta > video > height", stream),
//               frame_rate: getNumber("meta > video > frame_rate", stream),
//               codec: getText("meta > video > codec", stream),
//             },
//             audio: {
//               codec: getText("meta > audio > codec", stream),
//               sample_rate: getNumber("meta > audio > sample_rate", stream),
//               channels: getNumber("meta > audio > channels", stream),
//             },
//           },
//         }),
//       )

//       const timestamp = new Date().toLocaleTimeString()
//       const newData: AggregatedData = {
//         timestamp,
//         streams,
//         total_bw_in: streams.reduce((sum, stream) => sum + stream.bw_in, 0),
//         total_bw_out: streams.reduce((sum, stream) => sum + stream.bw_out, 0),
//         total_clients: streams.reduce((sum, stream) => sum + stream.nclients, 0),
//       }

//       setData((prevData) => [...prevData.slice(-20), newData])
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//     }
//   }, [])

//   useEffect(() => {
//     fetchStats()
//     const interval = setInterval(fetchStats, 2000)
//     return () => clearInterval(interval)
//   }, [fetchStats])

//   const latestData = data[data.length - 1]

//   return (
//     <ScrollArea className="w-full h-full">
//       <div className="p-5 bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">📊 RTMP Stream Statistics (Real-Time)</h2>

//         {/* 1️⃣ Total Bandwidth In/Out Over Time */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Total Bandwidth Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="timestamp" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Area
//                 type="monotone"
//                 dataKey="total_bw_in"
//                 stackId="1"
//                 stroke="#8884d8"
//                 fill="#8884d8"
//                 name="Total Bandwidth In (Kbps)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="total_bw_out"
//                 stackId="1"
//                 stroke="#82ca9d"
//                 fill="#82ca9d"
//                 name="Total Bandwidth Out (Kbps)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 2️⃣ Current Bandwidth Distribution */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Current Bandwidth Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={latestData?.streams}
//                 dataKey="bw_in"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label
//               >
//                 {latestData?.streams.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 3️⃣ Clients per Stream */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Clients per Stream</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={latestData?.streams}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="nclients" fill="#ffc658" name="Number of Clients" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 4️⃣ Audio/Video Bandwidth per Stream */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Audio/Video Bandwidth per Stream</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={latestData?.streams}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="bw_audio" stackId="a" fill="#8884d8" name="Audio Bandwidth (Kbps)" />
//               <Bar dataKey="bw_video" stackId="a" fill="#82ca9d" name="Video Bandwidth (Kbps)" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 5️⃣ Stream Information */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2">Stream Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {latestData?.streams.map((stream, index) => (
//               <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                 <h4 className="text-lg font-semibold mb-2">{stream.name}</h4>
//                 <p>
//                   Resolution: {stream.meta.video.width}x{stream.meta.video.height}
//                 </p>
//                 <p>Frame Rate: {stream.meta.video.frame_rate} fps</p>
//                 <p>Video Codec: {stream.meta.video.codec}</p>
//                 <p>
//                   Audio: {stream.meta.audio.codec}, {stream.meta.audio.sample_rate}Hz, {stream.meta.audio.channels} ch
//                 </p>
//                 <p>
//                   Duration: {Math.floor(stream.time / 60)}m {Math.floor(stream.time % 60)}s
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </ScrollArea>
//   )
// }

// export default StreamStats

