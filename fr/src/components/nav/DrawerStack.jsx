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
      {items.map((item) => (
        <Heading size={'md'} textAlign={'left'}>
          <DrawerActionTrigger onClick={() => redirect(item.address)}>
            <Link style={{ padding: '.2rem' }} to={item.address}>
              {item.name}
            </Link>
          </DrawerActionTrigger>
        </Heading>
      ))}

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

const items = [
  {
    name: 'home',
    address: '/',
  },
  {
    name: 'dashboard',
    address: '/dashboard',
  },
  {
    name: 'add item',
    address: '/new',
  },
  {
    name: 'discover',
    address: '/discover',
  },
  {
    name: 'info',
    address: '/info',
  },
];

export default DrawerStack;
