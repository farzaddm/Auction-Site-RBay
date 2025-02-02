import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

function Chart() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = [
    { name: 'Jan', sales: 1000 },
    { name: 'Ali', sales: 6000 },
    { name: 'Reza', sales: 2000 },
    { name: 'Ahmad', sales: 5000 },
  ];

  return (
    <Box
      shadow="md"
      width="full"
      backgroundColor="blackAlpha.700"
      p={10}
      borderBottomRadius={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LineChart
        width={Math.min(screenWidth * 0.8, 800)}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#ecfeff" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
}

export default Chart;
