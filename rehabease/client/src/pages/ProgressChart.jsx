import React, { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const ExerciseProgressChart = () => {
  const [progressData, setProgressData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/exercise-report") // Fetch JSON from backend
      .then((response) => response.json())
      .then((data) => setProgressData(data))
      .catch((error) => console.error("Error loading JSON:", error))
  }, [])

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Exercise Progress</h1>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Progress Chart</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#4a5568"
              />
              <YAxis stroke="#4a5568" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f7fafc",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Accuracy (%)" strokeWidth={2} />
              <Line type="monotone" dataKey="reps" stroke="#82ca9d" name="Reps" strokeWidth={2} />
              <Line type="monotone" dataKey="sets" stroke="#ffa726" name="Sets" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Report Data Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Full Report Data</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Timestamp</th>
              <th className="py-3 px-6 text-left">Accuracy (%)</th>
              <th className="py-3 px-6 text-left">Reps</th>
              <th className="py-3 px-6 text-left">Sets</th>
              <th className="py-3 px-6 text-left">Summary</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {progressData.map((entry, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{formatTimestamp(entry.timestamp)}</td>
                <td className="py-3 px-6 text-left">{entry.accuracy}</td>
                <td className="py-3 px-6 text-left">{entry.reps}</td>
                <td className="py-3 px-6 text-left">{entry.sets}</td>
                <td className="py-3 px-6 text-left">{entry.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExerciseProgressChart
