import {
  Button,
  Flex,
  Heading,
  Text,
  Icon,
  Image,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import DiscoverUserFlag from './DiscoverUserFlag';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

function DiscoverCard({
  badgeList,
  image,
  title,
  userImage,
  id,
  userName,
  isLiked,
  expire,
  isFollowed,
  loading,
  price,
}) {
  const navigate = useNavigate();

  return (
    <Flex
      // width={{base:"18rem", md:"18rem", lg: '22rem'}}
      direction={'column'}
      justifyContent={'start'}
      backgroundColor={'teal.800/85'}
      rounded={'lg'}
      shadow={'sm'}
      p={4}
    >
      <DiscoverUserFlag
        isFollowed={isFollowed}
        loading={loading}
        id={id}
        name={userName}
        image={userImage}
      />

      <Skeleton h={'32'} my={2} loading={loading}>
        <Image
          rounded={'md'}
          my={4}
          src={image}
          width={'100%'}
          height={{ base: 24, md: 28 }}
        />
      </Skeleton>

      <Skeleton h={'6'} loading={loading}>
        <Heading
          textAlign={'start'}
          fontWeight={'bold'}
          color={'whiteAlpha.900'}
        >
          {title}
        </Heading>
      </Skeleton>

      <Skeleton h={"4"} mt={2} loading={loading}>
        <Text textAlign={"start"} color={"whiteAlpha.800"}>${price.toFixed(2)}</Text>
      </Skeleton>
      <Skeleton loading={loading} h={'3'} mt={1}>
        <Text pb={3} textAlign={'start'} color={'whiteAlpha.600'}>
          {expire}
        </Text>
      </Skeleton>

      <Skeleton mt={4} loading={loading}>
        <HStack mt={4}>
          {badgeList.map((badge) => (
            <Badge colorPalette={badge == 'Hot' ? 'red' : 'gray'}>
              {badge}
            </Badge>
          ))}
        </HStack>
      </Skeleton>

      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap="wrap"
      >
        <Skeleton h={'4'} loading={loading}>
          <Flex alignItems="center" gap={1}>
            <Icon
              as={FaHeart}
              boxSize={5}
              color={isLiked ? 'red.400' : 'gray.400'}
            />
            <Text color="whiteAlpha.700" fontSize="sm" fontWeight="medium">
              100K
            </Text>
          </Flex>
        </Skeleton>

        <Skeleton mt={2} loading={loading}>
          <Button onClick={() => navigate('/product')} variant={'ghost'}>
            View
          </Button>
        </Skeleton>
      </Flex>
    </Flex>
  );
}

export default DiscoverCard;
