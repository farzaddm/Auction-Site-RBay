import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Chart({ bids }) {
  const [chartData, setChartData] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (bids && bids.length > 0) {
      const reversedBids = [...bids].reverse();

      const formattedData = reversedBids.map((bid, index) => ({
        name: bid?.user?.username || `Bid ${index + 1}`,
        price: bid?.price || 0,
        date: new Date(bid?.createdAt).toLocaleTimeString(),
      }));

      setChartData(formattedData);
    }
  }, [bids]);

  if (!bids || bids.length === 0) {
    return (
      <Box width={"full"} textAlign="center" p={8}>
        <Text>No bidding history available</Text>
      </Box>
    );
  }

  const prices = chartData.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#ecfeff" tick={{ fill: '#fff' }} />
        <YAxis
          tick={{ fill: '#fff' }}
          domain={[minPrice > 0 ? Math.floor(minPrice * 0.9) : 0, Math.floor(maxPrice * 1.1)]}
          tickFormatter={(value) => {
            if (value >= 1000) {
              return `$${(value / 1000).toFixed(1)}k`;
            }
            return `$${value}`;
          }}
          width={80}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2D3748',
            borderColor: '#4A5568',
            color: '#fff',
          }}
          formatter={(value) => [`$${value}`, 'Price']}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
