import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import AvatarWithTooltip from './AvatarWithTooltip';

function DrawerUserFlag({ name, id, image }) {

  return (
    <Flex
      justifyContent={"left"}
      alignItems={'center'}
      gap={4}
      pr={2}
      direction={'row'}
    >
      <AvatarWithTooltip image={image} name={name} mini />
      <Flex direction={"column"} justifyContent={"start"} gap={0}>
        <Heading size={'lg'} color={'whiteAlpha.900'}>
          {name}
        </Heading>
        <Heading size={'sm'} textAlign={"left"} color={'whiteAlpha.400'}>
          @{id}
        </Heading>
      </Flex>
    </Flex>
  );
}

export default DrawerUserFlag;
