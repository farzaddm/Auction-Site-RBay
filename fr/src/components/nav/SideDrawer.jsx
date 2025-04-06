import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '../ui/drawer';
import DrawerStack from './DrawerStack';
import { InputGroup } from '../ui/input-group';
import { LuSearch } from 'react-icons/lu';
import DrawerUserFlag from './DrawerUserFlag';
import DrawerFollowing from './DrawerFollowing';
import AvatarWithTooltip from './AvatarWithTooltip';

function SideDrawer({ open, setOpen }) {
  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={'start'}
    >
      <DrawerBackdrop />
      <DrawerContent>
        {/* <DrawerHeader>
          <DrawerTitle textAlign={'start'}>
            <Flex
              justifyContent={'left'}
              alignItems={'center'}
              gap={4}
              pr={2}
              direction={'row'}
            >
              <AvatarWithTooltip image={""} name={"ali Rezaei"} />
              <Flex direction={'column'} justifyContent={'start'} gap={0}>
                <Heading
                  size={'xl'}
                  color={'whiteAlpha.900'}
                >
                  Ali Rezaei
                </Heading>
                <Heading
                  size={'md'}
                  textAlign={'left'}
                  color={'whiteAlpha.400'}
                >
                  @ALI_R
                </Heading>
              </Flex>
            </Flex>
          </DrawerTitle>
        </DrawerHeader> */}
        <DrawerBody>
          {/* <InputGroup
            my={2}
            mx={'auto'}
            display={{ base: 'block', md: 'none' }}
            width={'90%'}
            startElement={<LuSearch />}
          >
            <Input placeholder="Search" variant="subtle" />
          </InputGroup> */}

          <Box mb={5}>
            <DrawerStack />
          </Box>

          <DrawerFollowing />
        </DrawerBody>
        <DrawerFooter>
          {localStorage.getItem('token') && (
            <DrawerActionTrigger>
              <Button variant="subtle" colorPalette={'red'}>
                Log Out
              </Button>
            </DrawerActionTrigger>
          )}
          <DrawerActionTrigger asChild>
            <Button variant="outline" colorPalette="red">
              Close
            </Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}

export default SideDrawer;
