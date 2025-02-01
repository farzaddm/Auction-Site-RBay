import { Box } from "@chakra-ui/react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
function Chart() {
  const data = [
    { name: "jan", sales: 1000 },
    { name: "ali", sales: 6000 },
    { name: "reza", sales: 2000 },
    { name: "ahmad", sales: 5000 },
  ]

  return <Box width={"full"} backgroundColor={"blackAlpha.700"} p={10} borderBottomRadius={10} display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <LineChart width={1000} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
      <XAxis dataKey="name" stroke="#ecfeff" />
      <YAxis />
      <Legend />
      <Tooltip />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
    </LineChart>
  </Box>
}

export default Chart