import { Heading, Stack, StackSeparator } from '@chakra-ui/react';
import DrawerUserFlag from './DrawerUserFlag';

function DrawerFollowing() {
  return (
    <>
      <Heading size={'lg'} textAlign={'left'}>
        Following List
      </Heading>
      <Stack
        height={'38vh'}
        overflowY={'auto'}
        mt={4}
        mx={2}
        separator={<StackSeparator color={'whiteAlpha.900'} />}
      >
        <DrawerUserFlag id={'test'} name={'ali rdcksbjdcksdcksj5'} image={''} size="small" />
        <DrawerUserFlag id={'test'} name={'ali reza'} image={''} size="small" />
        <DrawerUserFlag id={'test'} name={'ali reza'} image={''} size="small" />
        <DrawerUserFlag id={'test'} name={'ali reza'} image={''} size="small" />
        <DrawerUserFlag id={'test'} name={'ali reza'} image={''} size="small" />
        <DrawerUserFlag id={'test'} name={'ali reza'} image={''} size="small" />
      </Stack>
    </>
  );
}

export default DrawerFollowing;
