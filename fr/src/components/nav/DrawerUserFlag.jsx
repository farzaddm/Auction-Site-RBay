import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import AvatarWithTooltip from './AvatarWithTooltip';
import { Skeleton, SkeletonCircle } from '../ui/skeleton';

function DrawerUserFlag({ name, id, image, loading = true }) {
  return (
    <Flex
      justifyContent={'left'}
      alignItems={'center'}
      gap={4}
      pr={2}
      direction={'row'}
    >
      <SkeletonCircle size="8" loading={loading}>
        <AvatarWithTooltip image={image} name={name} mini />
      </SkeletonCircle>
      <Flex direction={'column'} justifyContent={'start'} gap={0}>
        <Skeleton h={'4'} mb={1} minW={20} loading={loading}>
          <Heading
            mt={'-1'}
            textAlign={'start'}
            size={'lg'}
            color={'whiteAlpha.900'}
          >
            {name}
          </Heading>
        </Skeleton>
        <Skeleton h={'3'} loading={loading}>
          <Heading
            mt={'-1'}
            size={'sm'}
            textAlign={'left'}
            color={'whiteAlpha.400'}
          >
            @{id}
          </Heading>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default DrawerUserFlag;
