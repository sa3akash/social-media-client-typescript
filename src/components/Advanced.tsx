import type React from "react"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
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

interface StreamData {
  name: string
  bw_in: number
  bw_out: number
  bw_audio: number
  bw_video: number
  nclients: number
  time: number
  meta: {
    video: {
      width: number
      height: number
      frame_rate: number
      codec: string
    }
    audio: {
      codec: string
      sample_rate: number
      channels: number
    }
  }
}

interface AggregatedData {
  timestamp: string
  total_bw_in: number
  total_bw_out: number
  total_clients: number
  streams: StreamData[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

interface StreamStatsProps {
  streamKey: string // Accept streamKey as a prop
}

const StreamStats: React.FC<StreamStatsProps> = ({ streamKey }) => {
  const [data, setData] = useState<AggregatedData[]>([])

  // Fetch stats function
  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get("/stat")
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, "text/xml")

      const server = xmlDoc.querySelector("server")
      if (!server) return

      const getNumber = (selector: string, element = server): number =>
        Number.parseFloat(element.querySelector(selector)?.textContent || "0") || 0
      const getText = (selector: string, element = server): string =>
        element.querySelector(selector)?.textContent?.trim() || "Unknown"

      const streams: StreamData[] = Array.from(server.querySelectorAll("application > live > stream")).map(
        (stream) => ({
          name: getText("name", stream),
          bw_in: getNumber("bw_in", stream) / 1024, // Convert to Kbps
          bw_out: getNumber("bw_out", stream) / 1024, // Convert to Kbps
          bw_audio: getNumber("bw_audio", stream) / 1024, // Convert to Kbps
          bw_video: getNumber("bw_video", stream) / 1024, // Convert to Kbps
          nclients: getNumber("nclients", stream),
          time: getNumber("time", stream),
          meta: {
            video: {
              width: getNumber("meta > video > width", stream),
              height: getNumber("meta > video > height", stream),
              frame_rate: getNumber("meta > video > frame_rate", stream),
              codec: getText("meta > video > codec", stream),
            },
            audio: {
              codec: getText("meta > audio > codec", stream),
              sample_rate: getNumber("meta > audio > sample_rate", stream),
              channels: getNumber("meta > audio > channels", stream),
            },
          },
        }),
      )

      // Filter streams to include only the one matching the streamKey
      const filteredStreams = streams.filter((stream) => stream.name === streamKey)

    //   if (filteredStreams.length === 0) return // No matching stream found

      const timestamp = new Date().toLocaleTimeString()
      const newData: AggregatedData = {
        timestamp,
        streams: filteredStreams,
        total_bw_in: filteredStreams.reduce((sum, stream) => sum + stream.bw_in, 0),
        total_bw_out: filteredStreams.reduce((sum, stream) => sum + stream.bw_out, 0),
        total_clients: filteredStreams.reduce((sum, stream) => sum + stream.nclients, 0),
      }

      // Update data state with the latest 20 entries
      setData((prevData) => {
        const updatedData = [...prevData, newData].slice(-20) // Keep only the latest 20 entries
        return updatedData
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }, [streamKey]) // Add streamKey as a dependency

  // Fetch stats on component mount and set up an interval
  useEffect(() => {
    fetchStats() // Initial fetch
    const interval = setInterval(fetchStats, 2000) // Fetch every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [fetchStats]) // Only fetchStats as a dependency

  const latestData = data[data.length - 1]

  return (
    <ScrollArea className="w-full h-full">
      <div className="p-5 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">📊 RTMP Stream Statistics (Real-Time)</h2>

        {/* 1️⃣ Total Bandwidth In/Out Over Time */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Total Bandwidth Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="total_bw_in"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name="Total Bandwidth In (Kbps)"
              />
              <Area
                type="monotone"
                dataKey="total_bw_out"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="Total Bandwidth Out (Kbps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 2️⃣ Current Bandwidth Distribution */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Current Bandwidth Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={latestData?.streams}
                dataKey="bw_in"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {latestData?.streams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3️⃣ Clients per Stream */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Clients per Stream</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={latestData?.streams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="nclients" fill="#ffc658" name="Number of Clients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4️⃣ Audio/Video Bandwidth per Stream */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Audio/Video Bandwidth per Stream</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={latestData?.streams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bw_audio" stackId="a" fill="#8884d8" name="Audio Bandwidth (Kbps)" />
              <Bar dataKey="bw_video" stackId="a" fill="#82ca9d" name="Video Bandwidth (Kbps)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5️⃣ Stream Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Stream Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestData?.streams.map((stream, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{stream.name}</h4>
                <p>
                  Resolution: {stream.meta.video.width}x{stream.meta.video.height}
                </p>
                <p>Frame Rate: {stream.meta.video.frame_rate} fps</p>
                <p>Video Codec: {stream.meta.video.codec}</p>
                <p>
                  Audio: {stream.meta.audio.codec}, {stream.meta.audio.sample_rate}Hz, {stream.meta.audio.channels} ch
                </p>
                <p>
                  Duration: {Math.floor(stream.time / 60)}m {Math.floor(stream.time % 60)}s
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default StreamStats

























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

//   // Fetch stats function
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

//       // Update data state with the latest 20 entries
//       setData((prevData) => {
//         const updatedData = [...prevData, newData].slice(-20) // Keep only the latest 20 entries
//         return updatedData
//       })
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//     }
//   }, []) // No dependencies for useCallback

//   // Fetch stats on component mount and set up an interval
//   useEffect(() => {
//     fetchStats() // Initial fetch
//     const interval = setInterval(fetchStats, 5000) // Fetch every 2 seconds

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval)
//   }, [fetchStats]) // Only fetchStats as a dependency

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