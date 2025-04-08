import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import { useParams } from 'react-router-dom';
import UserProducts from '../components/user/UserProducts';
import { useGetUser } from '../http/useHttp';
import { useEffect } from 'react';

function UserProfile() {
  const { id } = useParams();
  const { data, isError, error, isLoading } = useGetUser(id);

  useEffect(() => {
    if (isError) {
      console.log(data);
      console.log(error);
      console.log(error.response?.data?.message);
    }
  }, [data, isError, error]);

  if (isLoading) {
    return (
      <Box width={'80%'} minH={'100vh'} mx={'auto'} paddingTop={100}>
        <Text>Loading user data...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box width={'80%'} minH={'100vh'} mx={'auto'} paddingTop={100}>
        <Text color="red.500">Error loading user data: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box width={'80%'} minH={'100vh'} mx={'auto'} paddingTop={100}>
      <Box
        width={'100%'}
        backgroundColor={'green.50/50'}
        minHeight={'80vh'}
        rounded={10}
        shadow="md"
        p={{ base: 5, md: 10 }}
      >
        <Flex
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          gap={10}
          backgroundColor={'cyan.950/70'}
          minHeight="70vh"
          p={{ base: 5, md: 10 }}
          rounded="md"
        >
          <Flex
            direction={'column'}
            width={{ base: '100%', lg: '40%', md: '100%' }}
          >
            <Flex pl={3} pb={7} direction="row" gap={3} alignItems={'center'}>
              <Avatar
                mt={2}
                name={data?.name || 'User'}
                src={data?.pic || 'http://bit.ly/broken-link'}
                shadow="xs"
              />
              <Heading fontWeight={'bolder'}>{data?.name || 'User'}</Heading>
            </Flex>

            <Box textAlign="left" pr={4} mb={4}>
              {data?.job ||
              data?.education ||
              data?.location ||
              data?.date_of_birth ? (
                <>
                  {data?.job && (
                    <Text>
                      <Heading size="sm" display="inline" mr={2}>
                        Job:
                      </Heading>{' '}
                      {data.job}
                    </Text>
                  )}
                  {data?.education && (
                    <Text>
                      <Heading size="sm" display="inline" mr={2}>
                        Education:
                      </Heading>{' '}
                      {data.education}
                    </Text>
                  )}
                  {data?.location && (
                    <Text>
                      <Heading size="sm" display="inline" mr={2}>
                        Location:
                      </Heading>{' '}
                      {data.location}
                    </Text>
                  )}
                  {data?.date_of_birth && (
                    <Text>
                      <Heading size="sm" display="inline" mr={2}>
                        Birth Date:
                      </Heading>{' '}
                      {new Date(data.date_of_birth).toLocaleDateString()}
                    </Text>
                  )}
                </>
              ) : (
                <Text fontStyle="italic" color="gray.500">
                  No additional information is available for this user.
                </Text>
              )}
            </Box>
          </Flex>

          <UserProducts id={id} />
        </Flex>
      </Box>
    </Box>
  );
}

export default UserProfile;
