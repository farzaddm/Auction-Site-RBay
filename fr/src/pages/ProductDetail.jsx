import {
  Badge,
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
  HStack,
  Image,
  Input,
} from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Avatar } from '../components/ui/avatar';
import { Blockquote } from '../components/ui/blockquote';
import Chart from '../components/product/Chart';
import { useBidOnItem, useGetItembyId, useLikeItem } from '../http/useHttp';
import { Toaster, toaster } from '../components/ui/toaster';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/product/Chat';

function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetItembyId(id);
  const {
    mutate,
    isError: isLikeError,
    isPending,
    isSuccess: isLikeSuccess,
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
  const [remainingTime, setRemainingTime] = useState('');
  const ref = useRef();

  useEffect(() => {
    if (isError && error) {
      toaster.create({ title: error.message, type: 'error' });
    }
    if (isLikeError) {
      toaster.create({ title: 'Error liking the item', type: 'error' });
    }
    if (isLikeSuccess && likeData) {
      toaster.success({ title: likeData.message });
    }
    if (isBidError) {
      toaster.error({ title: bidError.message || 'Error placing bid' });
    }
    if (isBidSuccess) {
      toaster.success({ title: bidData });
    }
  }, [
    isError,
    error,
    isLikeError,
    isLikeSuccess,
    likeData,
    bidData,
    isBidSuccess,
    isBidError,
  ]);

  useEffect(() => {
    if (data?.item?.expiredTime) {
      setRemainingTime(getRemainingTime(data.item.expiredTime));
    }
  }, [data]);

  function getRemainingTime(expiredTime) {
    const expiryDate = new Date(expiredTime);
    const now = new Date();
    const diff = expiryDate - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  }

  function handleLikeClick() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toaster.create({ title: 'Please log in to like items', type: 'warning' });
      return;
    }
    mutate({ itemId: id, userId });
  }

  function handlePlaceBidClick() {
    const price = ref.current.value;
    if (!price) {
      toaster.create({ title: 'Please enter a bid amount', type: 'warning' });
      return;
    }
    bidMutate({ price, itemId: id });
    ref.current.value = '';
  }

  return (
    <Box width="90%" marginX="auto" minH="80vh" paddingTop="6rem">
      <Flex
        width="100%"
        flexDirection={{ xl: 'row', md: 'column' }}
        padding={10}
        gap={5}
        backgroundColor="whiteAlpha.200"
        borderTopRadius={10}
        shadow="md"
      >
        <Box flex={1} borderRadius={10}>
          <Skeleton isLoaded={!isLoading && !isError}>
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
          </Skeleton>
        </Box>

        <Box
          backgroundColor="teal.900/70"
          shadow="md"
          borderRadius={10}
          padding={10}
          flex={3}
          width="full"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Skeleton isLoaded={!isLoading && !isError}>
              <Text textStyle="2xl">{data?.item?.name || 'Product Name'}</Text>
            </Skeleton>

            {isPending ? (
              <Text>Pending...</Text>
            ) : (
              <Button variant="outline" onClick={handleLikeClick}>
                {data?.liked ? <FaHeart /> : <FaRegHeart />}
                <Text ml={2}>{data?.item?.likes || 0}</Text>
              </Button>
            )}
          </Flex>

          <Skeleton isLoaded={!isLoading && !isError}>
            <Blockquote
              bg="bg.subtle"
              padding="4"
              cite={
                <HStack mt="2" gap="3">
                  {data?.User && (
                    <>
                      <Avatar
                        size="sm"
                        name={data.User.username}
                        src={data.User.pic}
                      />
                      <Text fontWeight="medium">{data.User.username}</Text>
                    </>
                  )}
                </HStack>
              }
            >
              {data?.item?.description || 'No description available'}
            </Blockquote>
          </Skeleton>

          <HStack mt="4">
            {data?.item?.hotness && <Badge colorPalette="red">Hot</Badge>}
            {data?.item?.category?.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </HStack>

          <Flex justifyContent="space-between" mt={5}>
            <Text>High Bid: {data?.item?.price}$</Text>
            <Text>Bids: {data?.bids?.length || 0}</Text>
            <Text>Ending: {remainingTime}</Text>
          </Flex>

          <Flex mt={6} gap={2}>
            <Input
              variant="subtle"
              borderColor="whiteAlpha.700"
              type="number"
              placeholder="Place a bid"
              ref={ref}
            />
            {isBidPending ? (
              <Text>Pending...</Text>
            ) : (
              <Button onClick={handlePlaceBidClick}>Submit</Button>
            )}
          </Flex>
        </Box>
      </Flex>

      <Box
        shadow="md"
        width="full"
        backgroundColor="blackAlpha.700"
        p={10}
        borderBottomRadius={10}
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        <Chart />
        <Chat chatList={data?.chats} />
      </Box>
      {/* <Toaster /> */}
    </Box>
  );
}

export default ProductDetail;
