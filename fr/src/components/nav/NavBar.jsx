import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Icon,
  Spinner,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SideDrawer from './SideDrawer';
import AvatarWithTooltip from './AvatarWithTooltip';
import { FiMenu } from 'react-icons/fi';
import { useSearchItem } from '../../http/useHttp';
import { toaster } from '../ui/toaster';
import { InputGroup } from '../ui/input-group';
import { Link as RouterLink } from 'react-router-dom';
import getQueryClient from '../../query_client/query_client';

function NavBar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const { data, isError, error, isLoading, refetch } =
    useSearchItem(searchQuery);

  useEffect(() => {
    if (isError) {
      toaster.error({ title: error.message });
    }
  }, [isError]);

  useEffect(() => {
    if (sessionStorage.getItem('userName')) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') return;

    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      refetch();
    }, 400); // 400ms debounce
  }, [searchQuery]);

  return (
    <>
      <Box
        zIndex={1000}
        position={'absolute'}
        backgroundColor={'rgb(39, 39, 42)'}
        left={'1rem'}
        right={'1rem'}
        padding={'.5rem'}
        paddingX={'2rem'}
        rounded={'3rem'}
        border={'solid'}
        borderWidth={'2px'}
        top={'1rem'}
        align={'center'}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            maxW={'5.5rem'}
            position="relative"
            justifyContent={'space-between'}
          >
            <Icon
              as={FiMenu}
              boxSize={6}
              onClick={() => setDrawerOpen(true)}
              cursor={'pointer'}
              color="white"
            />
            <Text
              display={{ base: 'none', md: 'block' }}
              color={'green.400'}
              fontWeight={'bolder'}
              ml={3}
            >
              <Link to={'/'}>Rbay</Link>
            </Text>
          </Box>

          <Box flex="1" display={{ base: 'block', md: 'block' }}>
            <Box position={'relative'} mx={'auto'} maxW={'30rem'}>
              <InputGroup
                onFocus={() => setPopoverOpen(true)}
                onBlur={() => setTimeout(() => setPopoverOpen(false), 300)}
                m={0}
                startElement={<LuSearch />}
              >
                <Input
                  width={'full'}
                  placeholder="Search"
                  variant="subtle"
                  transition="ease-out"
                  transitionDuration=".3s"
                  _focus={{ width: { md: '20rem', lg: '30rem' } }}
                  padding=".3rem"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>

              <Box
                display={isPopoverOpen && searchQuery ? 'block' : 'none'}
                position={'absolute'}
                top={'3.2rem'}
                backgroundColor={'gray.800/90'}
                left={0}
                right={0}
                zIndex={20000}
                transition={'all .3s ease'}
                borderRadius="md"
                padding={2}
              >
                {isLoading ? (
                  <Flex justify="center" my={4}>
                    <Spinner color="teal.300" size="lg" />
                  </Flex>
                ) : data?.length > 0 ? (
                  <VStack spacing={3}>
                    {data.map((item) => (
                      <Box
                        as={RouterLink}
                        to={`/product/${item.id}`}
                        key={item.id}
                        w="100%"
                        bg="teal.700"
                        p={3}
                        rounded="md"
                        // onClick={() => {
                        //   getQueryClient().invalidateQueries(['itemById']);
                        //   console.log("wec")
                        // }}
                        _hover={{ bg: 'teal.600', cursor: 'pointer' }}
                        transition="background 0.3s"
                      >
                        <Text fontWeight="bold" fontSize="lg" color="white">
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.100">
                          {item.description}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text color="gray.300" textAlign="center" my={3}>
                    No results found.
                  </Text>
                )}
              </Box>
            </Box>
          </Box>

          {isLogged ? (
            <AvatarWithTooltip
              image={sessionStorage.getItem('pic') || ''}
              name={sessionStorage.getItem('userName')}
            />
          ) : (
            <Button
              variant="ghost"
              colorScheme="green"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          )}
        </Flex>
      </Box>

      <SideDrawer open={isDrawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

export default NavBar;
