import { Box, Button, Flex, Heading, Input, Spinner } from '@chakra-ui/react';
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
import { useLogout } from '../../http/useHttp';
import { useEffect } from 'react';
import { toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';

function SideDrawer({ open, setOpen }) {
  const navigate = useNavigate()
  const { mutate, isSuccess, data, isPending, error, isError } = useLogout();

  useEffect(() => {
    if (isSuccess) {
      toaster.success({ title: data.message });
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('pic');
    }
    if (isError) {
      toaster.error({ title: error.message });
    }
  }, [isSuccess, isError]);

  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={'start'}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerBody>
          <Box mb={5}>
            <DrawerStack />
          </Box>

          {sessionStorage.getItem('userId') && <DrawerFollowing />}
        </DrawerBody>
        <DrawerFooter>
          {sessionStorage.getItem('userId') ? (
            isPending ? (
              <Spinner />
            ) : (
              <DrawerActionTrigger>
                <Button variant="subtle" colorPalette={'red'} onClick={mutate}>
                  Log Out
                </Button>
              </DrawerActionTrigger>
            )
          ) : (
            <DrawerActionTrigger>
              <Button variant="subtle" colorPalette={'green'} onClick={() => navigate('/login')}>
                Log In
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
