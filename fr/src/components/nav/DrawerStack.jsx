import { Button, Heading, Stack, StackSeparator } from '@chakra-ui/react';
import { Link, redirect } from 'react-router-dom';
import { DrawerActionTrigger } from '../ui/drawer';

function DrawerStack() {
  return (
    <Stack
      mt={4}
      mx={2}
      separator={<StackSeparator color={'whiteAlpha.900'} />}
    >
      <Heading size={'md'} textAlign={'left'}>
        <DrawerActionTrigger onClick={() => redirect('/')}>
          <Link style={{ padding: '.2rem' }} to="/">
            Home
          </Link>
        </DrawerActionTrigger>
      </Heading>

      <Heading size={'md'} textAlign={'left'}>
        <DrawerActionTrigger>
          <Link style={{ padding: '.2rem' }} to="/dashboard">
            Dashboard
          </Link>
        </DrawerActionTrigger>
      </Heading>

      <Heading size={'md'} textAlign={'left'}>
        <DrawerActionTrigger>
          <Link style={{ padding: '.2rem' }} to="/new">
            Add Item
          </Link>
        </DrawerActionTrigger>
      </Heading>

      <Heading size={'md'} textAlign={'left'}>
        <DrawerActionTrigger>
          <Link style={{ padding: '.2rem' }} to="/discover">
            Discover
          </Link>
        </DrawerActionTrigger>
      </Heading>

      {/* <Heading colorPalette={'red'} size={'md'} textAlign={'left'}>
        <DrawerActionTrigger colorPalette={'red'}>
          <Link style={{ padding: '.2rem', color: 'red' }} to="/dashboard">
            Log Out
          </Link>
        </DrawerActionTrigger>
      </Heading> */}
    </Stack>
  );
}

export default DrawerStack;
