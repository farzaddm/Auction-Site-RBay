import { Box, Grid, Heading, Spinner, Text } from '@chakra-ui/react';
import DiscoverCard from './DiscoverCard';
import { useGetItem } from '../../http/useHttp';
import { useEffect } from 'react';
import { Toaster, toaster } from '../ui/toaster';
import formatTimeLeft from '../../query_client/dateReformater';


function DiscoverGrid({ queryParam }) {
  const userId = sessionStorage.getItem("userId")
  const { data, isLoading, refetch, isError, error } = useGetItem(queryParam, userId || "");

  useEffect(() => {
    console.log(queryParam);
    refetch();
  }, []);

  useEffect(() => {
    if (isError) {
      toaster.error({ title: error.message });
    }
  }, [isError, error]);

  return (
    <>
      {isLoading ? (
        <Box my={'auto'} mx={'auto'} width={'full'} textAlign={'center'}>
          <Spinner size={'xl'} color={'teal.400'} borderWidth={'4px'} />
        </Box>
      ) : data && data.length > 0 ? (
        <Grid
          p={3}
          templateColumns={{
            base: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr',
            lg: '1fr 1fr 1fr',
            xl: '1fr 1fr 1fr 1fr',
          }}
          gap={5}
        >
          {data.map((item) => (
            <DiscoverCard
              key={item.id}
              price={item.price}
              category={item.category}
              loading={false}
              expire={formatTimeLeft(item.createdAt, item.duration)}
              likes={item.likes}
              isFollowed={item.isFollowing}
              id={item.id}
              userId={item.user.id}
              image={item.pic}
              isLiked={item.isLiked}
              isHot={item.hotness}
              title={item.name}
              userImage={item.user.pic}
              userName={item.user.username}
            />
          ))}
        </Grid>
      ) : (
        <Box textAlign={'center'} width={'full'}>
          <Heading>No Item found</Heading>
          <Text>Change item filters to find items</Text>
        </Box>
      )}
      {/* <Toaster /> */}
    </>
  );
}

export default DiscoverGrid;