import { Box, Heading, Grid, Spinner, Text } from '@chakra-ui/react';
import UserProductCard from './UserProductCard';
import { useGetUserItems } from '../../http/useHttp';
import { useEffect } from 'react';
import { toaster } from '../ui/toaster';

function UserProducts({ id }) {
  const { data, isError, isLoading, error, isSuccess } = useGetUserItems(id);

  useEffect(() => {
    if (isError) toaster.error({ title: error.message });
  }, [isError]);

  return (
    <Box width={{ base: '100%', lg: '60%' }} mx="auto">
      <Heading fontWeight="bold" textAlign="left" mb={4}>
        User Products
      </Heading>

      <Box overflowY="auto" h={{ base: '80vh', md: '55vh' }} pr={2}>
        <Grid
          templateColumns={{
            base: '1fr',
            md: '1fr 1fr',
            lg: '1fr',
            xl: '1fr 1fr',
          }}
          gap={5}
        >
          {isLoading ? (
            <Spinner />
          ) : isSuccess && data ? (
            data.items.map((item) => (
              <UserProductCard
                key={item.id}
                createdAt={item.createdAt}
                duration={item.duration}
                id={item.id}
                name={item.name}
                pic={item.pic}
                price={item.price}
              />
            ))
          ) : (
            <Text>ok</Text>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default UserProducts;
