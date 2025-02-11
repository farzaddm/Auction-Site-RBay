import { Button, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react';
import AvatarWithTooltip from '../nav/AvatarWithTooltip';
import { Skeleton, SkeletonCircle, SkeletonText } from '../ui/skeleton';

function DiscoverUserFlag({ image, name, id, isFollowed, loading }) {
  return (
    <Grid alignItems="center" gap={4} pr={2} templateColumns="auto 1fr auto">
      <SkeletonCircle loading={loading} h="10">
        <AvatarWithTooltip image={image} name={name} palette="accent" />
      </SkeletonCircle>

      <Flex direction="column" justifyContent="center">
        <Skeleton loading={loading} h={'4'}>
          <Heading
            h={'6'}
            size="md"
            textAlign={'start'}
            color="whiteAlpha.900"
            w={"20"}
            isTruncated
            noOfLines={1}
          >
            {name.length > 10 ? name.substring(0, 8) + '...' : name}
          </Heading>
        </Skeleton>

        <Skeleton h={'3'} mt={1} loading={loading}>
          <Heading size="xs" textAlign="left" color="whiteAlpha.500">
            @{id}
          </Heading>
        </Skeleton>
      </Flex>

      <Skeleton loading={loading}>
        <Button
          size={'xs'}
          variant={'subtle'}
          colorPalette={isFollowed ? 'red' : 'blue'}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </Skeleton>
    </Grid>
  );
}

export default DiscoverUserFlag;
