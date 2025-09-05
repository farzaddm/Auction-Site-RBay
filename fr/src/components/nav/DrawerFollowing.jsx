import {
  Button,
  Heading,
  Spinner,
  Stack,
  StackSeparator,
  Text,
} from '@chakra-ui/react';
import DrawerUserFlag from './DrawerUserFlag';
import { useGetFollowers } from '../../http/useHttp';
import { useEffect } from 'react';
import { toaster } from '../ui/toaster';

function DrawerFollowing() {
  const userId = sessionStorage.getItem('userId');
  // console.log(userId)
  const { data, isError, error, isLoading } = useGetFollowers(userId);

  console.log(data);

  useEffect(() => {
    if (isError) {
      if (error.status == 401) {
        sessionStorage.removeItem('userId');
        toaster.error({
          title: 'You must login again',
          description: (
            <Button
              onClick={() => navigate('/login')}
              variant={'solid'}
              colorPalette={'white'}
            >
              Login
            </Button>
          ),
        });
      } else {
        toaster.error({ title: error.response.data.error });
      }
    }
  }, [isError, error, data]);
  return (
    <>
      {/* <Heading size={'lg'} textAlign={'left'}>
        Followers List
      </Heading>
      <Stack
        height={'45vh'}
        overflowY={'auto'}
        mt={4}
        mx={2}
        separator={<StackSeparator color={'whiteAlpha.900'} />}
      >
        {isLoading ? (
          <Spinner />
        ) : data ? (
          data.followers.map((item) => (
            <DrawerUserFlag
              id={item.email}
              name={item.username}
              image={''}
              size="small"
              loading={false}
            />
          ))
        ) : (
          <Text>No followers found</Text>
        )}
      </Stack> */}
    </>
  );
}

export default DrawerFollowing;
