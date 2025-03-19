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

function Chart({ bids }) {
  const calcedBide = bids.forEach((element) => {
    return { price: element.price, name: element.User.username };
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        data={calcedBide}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#ecfeff" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
}

// const data = [
//   { name: 'Jan', sales: 1000 },
//   { name: 'Ali', sales: 6000 },
//   { name: 'Reza', sales: 2000 },
//   { name: 'Ahmad', sales: 5000 },
// ];

export default Chart;
