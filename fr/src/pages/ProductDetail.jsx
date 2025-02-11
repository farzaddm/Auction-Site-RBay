import {
  Badge,
  BlockquoteIcon,
  Box,
  Button,
  Card,
  defineStyle,
  Field,
  Flex,
  Float,
  Group,
  HStack,
  Icon,
  Image,
  Input,
  LinkBox,
  Skeleton,
  Span,
  Text,
} from '@chakra-ui/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Avatar } from '../components/ui/avatar';
import { Blockquote } from '../components/ui/blockquote';
import Chart from '../components/product/Chart';
import { useState } from 'react';

function ProductDetail() {
  const [loading, setLoading] = useState(false);

  return (
    <Box width="90%" marginX={'auto'} minH={'80vh'} paddingTop={'6rem'}>
      <Flex
        width={'100%'}
        height={'full'}
        marginX={'auto'}
        flexDirection={{
          xlDown: 'row',
          xl: 'row',
          md: 'column',
          mdDown: 'column',
        }}
        padding={10}
        gap={5}
        backgroundColor={'whiteAlpha.200'}
        borderTopRadius={10}
        shadow="md"
      >
        <Box flex={1} borderRadius={10}>
          <Skeleton height={'full'} loading={loading}>
            <Image
              borderRadius={10}
              objectFit="cover"
              width="full"
              height="full"
              src="/test.jpg"
              alt="Caffe Latte"
            />
          </Skeleton>
        </Box>
        <Box
          backgroundColor={'teal.900/70'}
          shadow="md"
          borderRadius={10}
          padding={{ xl: 10, xlDown: 10, sm: 5, smDown: 5 }}
          flex={3}
          width={'full'}
        >
          <Flex
            marginBottom={3}
            alignItems="center"
            flexDirection={{
              xl: 'row',
              xlDown: 'row',
              sm: 'column',
              smDown: 'column',
            }}
            margin={0}
            justifyContent={'space-between'}
          >
            <Skeleton height="7" loading={loading}>
              <Text textStyle={{ base: '2xl', mdDown: 'xl' }}>
                Incredible Soft Bike
              </Text>
            </Skeleton>

            <Button maxW={'rem'} variant="outline" padding={0}>
              <Group attached width={'full'}>
                <Button color={'whiteAlpha.600'} variant="outline">
                  {/* <Icon h={6}><FaHeart /></Icon> */}
                  <Icon h={5}>
                    <FaRegHeart />
                  </Icon>
                  <Text h={5}>Like</Text>
                </Button>
                <Skeleton loading={loading}>
                  <Text w={10}>100k</Text>
                </Skeleton>
              </Group>
            </Button>
          </Flex>
          <Text marginY={3} textAlign={'left'} textStyle={{ mdDown: 'xs' }}>
            <Skeleton height="30" loading={loading}>
              <Blockquote
                bg="bg.subtle"
                padding="4"
                cite={
                  <HStack mt="2" gap="3">
                    <Avatar
                      size="sm"
                      name="Emily Jones"
                      src="https://i.pravatar.cc/150?u=re"
                    />
                    <Span fontWeight="medium">Emily Jones</Span>
                  </HStack>
                }
              >
                A wood chair is a type of chair that is made from wood. Wood
                chairs can be either indoor or outdoor chairs, and they come in
                a variety of different styles. Indoor wood chairs are typically
                more ornate than outdoor wood chairs, and they may have features
                such as carvings or upholstered seats. Outdoor wood chairs are
                typically more simple in design, and they often have slatted
                seats that allow water to drain off them easily.
              </Blockquote>
            </Skeleton>
          </Text>

          <Text
            textAlign={'left'}
            color={'whiteAlpha.400'}
            my={2}
            textStyle={{ mdDown: 'sm' }}
            _hover={{ textDecoration: 'underline' }}
          >
            <Link>See the seller</Link>
          </Text>

          <Flex
            flexDirection={{ base: 'row', mdDown: 'column' }}
            alignItems="left"
            gapY=".5rem"
            justifyContent="space-between"
            marginY={5}
          >
            <Group attached>
              <Text
                borderColor={'whiteAlpha.100'}
                color={'whiteAlpha.600'}
                borderWidth="2px"
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}
                padding={3}
              >
                High Bid
              </Text>
              <Skeleton loading={loading}>
                <Text
                  borderColor={'whiteAlpha.100'}
                  borderWidth="2px"
                  borderTopRightRadius={5}
                  borderBottomRightRadius={5}
                  padding={3}
                >
                  16.50$
                </Text>
              </Skeleton>
            </Group>
            <Group attached>
              <Text
                borderColor={'whiteAlpha.100'}
                color={'whiteAlpha.600'}
                borderWidth="2px"
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}
                padding={3}
              >
                Bids
              </Text>
              <Skeleton loading={loading}>
                <Text
                  borderColor={'whiteAlpha.100'}
                  borderWidth="2px"
                  borderTopRightRadius={5}
                  borderBottomRightRadius={5}
                  padding={3}
                >
                  6
                </Text>
              </Skeleton>
            </Group>
            <Group attached>
              <Text
                borderColor={'whiteAlpha.100'}
                color={'whiteAlpha.600'}
                borderWidth="2px"
                borderTopLeftRadius={5}
                borderBottomLeftRadius={5}
                padding={3}
              >
                Ending
              </Text>
              <Skeleton loading={loading}>
                <Text
                  borderColor={'whiteAlpha.100'}
                  borderWidth="2px"
                  borderTopRightRadius={5}
                  borderBottomRightRadius={5}
                  padding={3}
                >
                  10 days ago
                </Text>
              </Skeleton>
            </Group>
          </Flex>

          <HStack mt="4">
            <Badge>Hot</Badge>
            <Badge>Caffeine</Badge>
          </HStack>

          <Flex
            backgroundColor={"blackAlpha.700/80"}
            rounded={"md"}
            p={4}
            marginTop={6}
            direction={{
              base: 'row',
              xl: 'row',
              mdToXl: 'row',
              md: 'column',
              mdDown: 'column',
            }}
            gap={2}
            width={{base: "90%", lg:"50%"}}
            justifyContent={'left'}
            alignItems={'left'}
          >
            <Field.Root>
              <Box
                pos="relative"
                w={{
                  base: '80%',
                  xl: '80%',
                  mdToXl: '80%',
                  md: '100%',
                  mdDown: '100%',
                }}
              >
                <Input
                  className="peer"
                  variant={"subtle"}
                  borderColor={'whiteAlpha.700'}
                  placeholder=""
                  type="number"
                />
                <Field.Label css={floatingStyles}>place a bid</Field.Label>
              </Box>
            </Field.Root>

            <Button maxW={20}>Submit</Button>
          </Flex>
        </Box>
      </Flex>

      <Chart />
    </Box>
  );
}

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg',
  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'fg.muted',
    top: '2.5',
    insetStart: '3',
  },
  _peerFocusVisible: {
    color: 'fg',
    top: '-3',
    insetStart: '2',
  },
});
export default ProductDetail;
