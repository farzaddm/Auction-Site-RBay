import { Box, Grid, Heading } from '@chakra-ui/react';
import DiscoverCard from './DiscoverCard';
import { useGetItem } from '../../http/useHttp';
import { useEffect } from 'react';

function DiscoverGrid({ query }) {
  const { data, isLoading, refetch, isError, error } = useGetItem();
  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <>
      {isError ? (
        <Box>
          <Heading>{error.message}</Heading>
        </Box>
      ) : (
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
              price={20}
              badgeList={['Hot', 'Decoration']}
              loading={false}
              expire={'2 days'}
              isFollowed={true}
              id={'ali_Reza'}
              image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
              isLiked={true}
              title={'Lorem ipsum dolor'}
              userImage={'https://thispersondoesnotexist.com/'}
              userName={'ali reza'}
            />
          ))}
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali reza'}
          />
          <DiscoverCard
            price={20}
            badgeList={['Hot', 'Decoration']}
            loading={false}
            expire={'2 days'}
            isFollowed={true}
            id={'ali_Reza'}
            image={'https://realrealreal-redis.s3.amazonaws.com/155.jpg'}
            isLiked={true}
            title={'Lorem ipsum dolor'}
            userImage={'https://thispersondoesnotexist.com/'}
            userName={'ali rezasdckadsckasjdn'}
          />
        </Grid>
      )}
    </>
  );
}

export default DiscoverGrid;
