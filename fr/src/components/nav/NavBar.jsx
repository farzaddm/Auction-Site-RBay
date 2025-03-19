import { InputGroup } from '../ui/input-group';
import { Box, Flex, Text, Input, Button, Icon } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SideDrawer from './SideDrawer';
import AvatarWithTooltip from './AvatarWithTooltip';
import { FiMenu } from 'react-icons/fi';

function NavBar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // const openDrawer = (e) => {
  //   if (e.key == 'Enter') {
  //     setOpen(true);
  //   }
  // };

  // document.addEventListener('keypress', openDrawer);

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
            <Icon size={'lg'} onClick={() => setDrawerOpen(true)} cursor={'pointer'}>
              <FiMenu />
            </Icon>
            <Text color={'green.400'} fontWeight={'bolder'}>
              <Link to={'/'}>Rbay</Link>
            </Text>
          </Box>

          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <InputGroup startElement={<LuSearch />}>
              <Input
                placeholder="Search"
                variant="subtle"
                transition="ease-out"
                transitionDuration=".3s"
                _focus={{ width: { base: '20rem', lg: '30rem' } }}
                padding=".3rem"
              />
            </InputGroup>
          </Box>

          <AvatarWithTooltip name="New User" />

        </Flex>
      </Box>

      <SideDrawer open={isDrawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

export default NavBar;
