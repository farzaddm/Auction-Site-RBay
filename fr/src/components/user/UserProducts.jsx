import { Box, Heading, Grid } from '@chakra-ui/react';
import UserProductCard from './UserProductCard';

function UserProducts() {
  return (
    <Box width={{base:"100%", lg:"60%"}} mx="auto">
      <Heading fontWeight="bold" textAlign="left" mb={4}>
        User Products
      </Heading>

      <Box overflowY="auto" h={{base:"80vh", md:"55vh"}} pr={2}>
        <Grid
          templateColumns={{base:"1fr", md:"1fr 1fr", lg:"1fr", xl:"1fr 1fr"}}
          gap={5}
        >
          {[...Array(12)].map((_, index) => (
            <UserProductCard key={index} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default UserProducts;
