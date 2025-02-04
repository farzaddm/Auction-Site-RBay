import { InputGroup } from '../ui/input-group';
import { Box, Flex, Text, Input, Button, Icon } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideDrawer from './SideDrawer';
import AvatarWithTooltip from './AvatarWithTooltip';
import { FiMenu } from 'react-icons/fi';

function NavBar() {
  const [open, setOpen] = useState(false);

  const openDrawer = (e) => {
    if (e.key == 'Enter') {
      setOpen(true);
    }
  };

  document.addEventListener('keypress', openDrawer);

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
            width={'30%'}
            maxW={'5.5rem'}
            position="relative"
            justifyContent={'space-between'}
          >
            <Icon size={'lg'} onClick={() => setOpen(true)} cursor={'pointer'}>
              <FiMenu />
            </Icon>
            <Text color={'green.400'} fontWeight={'bolder'}>
              <Link to={'/'}>Rbay</Link>
            </Text>
          </Box>

          <Box flex="1" display={{ base: 'block', mdDown: 'none' }}>
            <InputGroup startElement={<LuSearch />}>
              <Input
                placeholder="Search"
                variant="subtle"
                transition="ease-out"
                transitionDuration=".3s"
                _focus={{ width: { base: '30rem', lgDown: '20rem' } }}
                padding=".3rem"
              />
            </InputGroup>
          </Box>

          <Box
            display={'flex'}
            position={'relative'}
            flexDirection={'row'}
            maxWidth={'40rem'}
            justifyContent="space-between"
          >
            <Button
              variant="outline"
              _hover={{ borderColor: 'whiteAlpha.400' }}
              display={{ base: 'block', smDown: 'none' }}
            >
              Login
            </Button>
            <Button
              variant="outline"
              marginX={'1rem'}
              _hover={{ borderColor: 'whiteAlpha.400' }}
              display={{ base: 'block', smDown: 'none' }}
            >
              SignUp
            </Button>
            <AvatarWithTooltip name="New User" />
          </Box>
        </Flex>
      </Box>

      <SideDrawer open={open} setOpen={setOpen} />
    </>
  );
}

export default NavBar;
