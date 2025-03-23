import { InputGroup } from '../ui/input-group';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Icon,
  Popover,
  Portal,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SideDrawer from './SideDrawer';
import AvatarWithTooltip from './AvatarWithTooltip';
import { FiMenu } from 'react-icons/fi';
import { useSearchItem } from '../../http/useHttp';
import { Toaster, toaster } from '../ui/toaster';

function NavBar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isError, error, isLoading, refetch } =
    useSearchItem(searchQuery);

  useEffect(() => {
    if (isError) {
      toaster.error({ title: error.message });
    }
  }, [isError]);

  const handleChange = (e) => {
    if (e.key == 'Enter') {
      console.log(e.target.value);
      setSearchQuery(e.target.value);
      refetch();
    }
  };

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
              size={'lg'}
              onClick={() => setDrawerOpen(true)}
              cursor={'pointer'}
            >
              <FiMenu />
            </Icon>
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
                onBlur={() => setPopoverOpen(false)}
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
                  onKeyDown={(e) => handleChange(e)}
                  // ref={ref.current}
                />
              </InputGroup>

              <Box
                display={isPopoverOpen ? 'block' : 'none'}
                position={'absolute'}
                top={'3.2rem'}
                backgroundColor={'gray.800/90'}
                left={0}
                right={0}
                zIndex={20000}
                transition={'all .3s ease'}
              >
                {isLoading ? (
                  <Spinner color={'teal.400'} m={4} size={'lg'} />
                ) : (
                  data && (
                    <VStack>
                      {data?.map((item) => (
                        <VStack backgroundColor={'teal.800'} my={2}>
                          <Heading>{item.name}</Heading>
                          <Text>{item.description}</Text>
                        </VStack>
                      ))}
                    </VStack>
                  )
                )}
              </Box>
            </Box>
          </Box>

          <AvatarWithTooltip name="New User" />
        </Flex>
      </Box>

      <SideDrawer open={isDrawerOpen} setOpen={setDrawerOpen} />
      {/* <Toaster /> */}
    </>
  );
}

export default NavBar;
