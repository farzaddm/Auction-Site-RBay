import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  HStack,
  Image,
  Input,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Avatar } from '../components/ui/avatar';
import Chart from '../components/product/Chart';
import { useBidOnItem, useGetItembyId, useLikeItem } from '../http/useHttp';
import { toaster } from '../components/ui/toaster';
import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Chat from '../components/product/Chat';
import formatTimeLeft from '../query_client/dateReformater';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, error } = useGetItembyId(id);
  const {
    mutate,
    isError: isLikeError,
    isPending,
    isSuccess: isLikeSuccess,
    error: likeError,
    data: likeData,
  } = useLikeItem();
  const {
    mutate: bidMutate,
    data: bidData,
    isPending: isBidPending,
    isError: isBidError,
    error: bidError,
    isSuccess: isBidSuccess,
  } = useBidOnItem();
  const ref = useRef();

  useEffect(() => {
    if (isError && error) {
      toaster.create({ title: error.response.data.message, type: 'error' });
      error.status == 404 && navigate('/');
    }
    if (isLikeError) {
      toaster.create({ title: likeError.response.data.error, type: 'error' });
    }
    if (isLikeSuccess && likeData) {
      toaster.success({ title: likeData.message });
    }
    if (isBidError) {
      if (bidError.response.status == 401) {
        toaster.error({
          title: bidError.response.data.error,
          description: (
            <Button
              onClick={() => navigate('/login')}
              variant={'solid'}
              colorPalette={'white'}
            >
              Login
            </Button>
          ),
        });
      } else {
        toaster.error({ title: bidError.response.data.error });
      }
    }
    if (isBidSuccess) {
      toaster.success({ title: bidData.message });
    }
  }, [
    isError,
    error,
    isLikeError,
    isLikeSuccess,
    likeData,
    isBidSuccess,
    isBidError,
  ]);

  function handleLikeClick() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      toaster.create({
        title: 'Please log in to like items',
        description: (
          <Button
            onClick={() => navigate('/login')}
            variant={'solid'}
            colorPalette={'white'}
          >
            Login
          </Button>
        ),
        type: 'warning',
      });
      return;
    }
    mutate({ itemId: id, userId });
  }

  function handlePlaceBidClick() {
    const price = ref.current.value;
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      toaster.create({
        title: 'Please log in to place your bid',
        description: (
          <Button
            onClick={() => navigate('/login')}
            variant={'solid'}
            colorPalette={'white'}
          >
            Login
          </Button>
        ),
        type: 'warning',
      });
      return;
    }
    if (data?.item.user.id == userId) {
      toaster.error({ title: "You can't bid on your own product" });
      return;
    }
    if (!price) {
      toaster.create({ title: 'Please enter a bid amount', type: 'warning' });
      return;
    }
    if (price > 1000) {
      toaster.create({ title: 'Bid amount exceeds limit', type: 'warning' });
      return;
    }
    bidMutate({ price, itemId: id });
    ref.current.value = '';
  }

  return (
    <Box width="90%" marginX="auto" minH="80vh" paddingTop="6rem">
      <Flex
        width="100%"
        flexDirection={{ base: 'column', lg: 'row' }}
        padding={{ base: 4, md: 10 }}
        gap={5}
        backgroundColor="whiteAlpha.200"
        borderTopRadius={10}
        shadow="md"
      >
        <Box flex={1} borderRadius={10} minH={{ base: '100%', md: '100%' }}>
          {data?.item?.pic && (
            <Image
              borderRadius={10}
              objectFit="cover"
              width="full"
              height="full"
              src={data.item.pic}
              alt={data.item.name}
            />
          )}
        </Box>

        <Box
          backgroundColor="teal.900/70"
          shadow="md"
          borderRadius={10}
          padding={{ base: 4, md: 10 }}
          flex={3}
          width="full"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
              {data?.item?.name || 'Product Name'}
            </Text>

            {isPending ? (
              <Text>Pending...</Text>
            ) : (
              <Button variant="outline" onClick={handleLikeClick}>
                {data?.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                <Text ml={2}>{data?.item?.likes || 0}</Text>
              </Button>
            )}
          </Flex>

          <Box
            bg="whiteAlpha.300"
            p={{ base: 3, md: 4 }}
            borderRadius="lg"
            mt={4}
            sx={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            <HStack mb={3} spacing={3} align="center">
              <Avatar
                size="sm"
                name={data?.item.user.username}
                // src={data?.user?.pic}
              />
              <Text
                cursor={'pointer'}
                onClick={() => navigate(`/user/${data?.item.user.id}`)}
                fontWeight="medium"
              >
                {data?.item.user.username}
              </Text>
            </HStack>

            <Text fontSize="md" mb={3}>
              {data?.item?.description || 'No description available'}
            </Text>
          </Box>

          <HStack mt={4} flexWrap="wrap">
            {data?.item?.hotness && (
              <Badge colorScheme="red" variant="solid">
                Hot
              </Badge>
            )}
            <Badge colorScheme="teal">{data?.item.category}</Badge>
          </HStack>

          <Flex
            justifyContent="space-between"
            mt={5}
            flexDirection={{ base: 'column', sm: 'row' }}
            gap={{ base: 2, sm: 0 }}
          >
            <Text>High Bid: {data?.item?.price}$</Text>
            <Text>Bids: {data?.bids?.length || 0}</Text>
            <Text>Ending: {formatTimeLeft(data?.item.expiredTime, data?.item.duration)}</Text>
          </Flex>

          <Flex
            mt={6}
            gap={2}
            flexDirection={{ base: 'column', sm: 'row' }}
            alignItems="center"
          >
            <Input
              variant="filled"
              borderColor="whiteAlpha.700"
              type="number"
              placeholder="Place a bid"
              ref={ref}
              flex={1}
            />
            {isBidPending ? (
              <Spinner borderWidth={'4px'} color={'green.400'} />
            ) : (
              <Button onClick={handlePlaceBidClick} colorScheme="teal" px={6}>
                Submit
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>

      <Box
        shadow="md"
        width="full"
        backgroundColor="blackAlpha.700"
        p={{ base: 4, md: 10 }}
        borderBottomRadius={10}
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Chart bids={data?.bids} />
        <Chat itemId={id} />
      </Box>
    </Box>
  );
}

export default ProductDetail;
