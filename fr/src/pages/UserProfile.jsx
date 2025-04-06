import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import UserProducts from '../components/user/UserProducts';
import { use } from 'react';
import { useGetUser } from '../http/useHttp';

function UserProfile() {
  const { id } = useParams();
  const { data } = useGetUser(id);
  console.log(data);

  return (
    <Box width={'80%'} minH={'100vh'} mx={'auto'} paddingTop={100}>
      <Box
        width={'100%'}
        backgroundColor={'green.50/50'}
        minHeight={'80vh'}
        rounded={10}
        shadow="md"
        p={{base:5, md:10}}
      >
        <Flex
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          gap={10}
          backgroundColor={'cyan.950/70'}
          minHeight="70vh"
          p={{base:5, md:10}}
          rounded="md"
        >
          <Flex
            direction={'column'}
            width={{base:'100%', lg:"40%", md:"100%"}}
          >
            <Flex pl={3} pb={7} direction="row" gap={3}>
              <Avatar
                mt={2}
                name="ali rezaei"
                src="http://bit.ly/broken-link"
                shadow="xs"
              />
              <Box>
                <Heading fontWeight={'bolder'}>Ali Rezaei</Heading>
                <Text fontWeight={'light'}>@Ali_Rezaei</Text>
              </Box>
            </Flex>

            <Text pr={4} textAlign={'left'}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sunt
              eligendi natus, voluptatem quos vero asperiores repudiandae nulla
              iure minus iste obcaecati dolore, fugit sit velit, nemo
              aspernatur! Vero iste quam sed consequatur, ex eius quos sint non
              mollitia neque adipisci omnis suscipit expedita nulla enim beatae?
              Ea nesciunt quasi cum perspiciatis omnis.
            </Text>

            <Button variant="surface" maxW={20} mt={10}>
              Follow
            </Button>
          </Flex>

          <UserProducts />
        </Flex>
      </Box>
    </Box>
  );
}

export default UserProfile;
