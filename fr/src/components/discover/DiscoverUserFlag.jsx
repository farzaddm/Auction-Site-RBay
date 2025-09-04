import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import AvatarWithTooltip from '../nav/AvatarWithTooltip';
import { SkeletonCircle } from '../ui/skeleton';
import { useFollowUser } from '../../http/useHttp';
import { useEffect } from 'react';
import { toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';

function DiscoverUserFlag({ image, name, loading, isFollowing, userId }) {
  const currentUserId = sessionStorage.getItem('userId');
  const { mutate, isPending, data, isError, error, isSuccess } =
    useFollowUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toaster.success({ title: data.message });
    }
    if (isError) {
      if (error.response?.status === 401) {
        toaster.error({
          title: error.response.data.error,
          description: (
            <Button
              onClick={() => navigate('/login')}
              variant={'solid'}
              colorScheme={'white'}
            >
              Login
            </Button>
          ),
        });
      } else {
        toaster.error({
          title: error.response?.data?.error || 'An error occurred',
        });
      }
    }
  }, [isError, isSuccess, error, navigate]);

  return (
    <Grid
      alignItems={'center'}
      width={'30vh'}
      gap={3}
      pr={2}
      pl={0}
      templateColumns="auto 1fr auto"
    >
      <SkeletonCircle loading={loading} h="10">
        <AvatarWithTooltip image={image} name={name} palette="accent" />
      </SkeletonCircle>

      <Flex direction="column" justifyContent="center">
        <Heading
          h={'6'}
          size="md"
          textAlign={'start'}
          color="whiteAlpha.900"
          w={'20'}
          isTruncated
          noOfLines={1}
        >
          {name?.length > 10 ? name.substring(0, 8) + '...' : name}
        </Heading>
      </Flex>

      {currentUserId && currentUserId != userId ? (
        isPending ? (
          <Text>Pending...</Text>
        ) : (
          <Button
            w={'16'}
            h={'8'}
            variant={'ghost'}
            colorPalette={isFollowing ? 'red' : 'blue'}
            onClick={() => mutate(userId)}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )
      ) : null}
    </Grid>
  );
}

export default DiscoverUserFlag;
