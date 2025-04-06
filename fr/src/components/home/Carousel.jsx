import { Box, Icon, IconButton, Spinner, Text } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef } from 'react';
import CarouselItem from './CarouselItem';
import { useGetItem } from '../../http/useHttp';

export default function Carousel() {
  const scrollContainerRef = useRef(null);
  const { data, isLoading, isError, error } = useGetItem(
    'sort=newest&price=1,1000'
  );

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Text
        textAlign={'left'}
        maxW={{
          base: '90rem',
          lg: '70rem',
          lgDown: '50rem',
          md: '40rem',
          mdDown: '30rem',
          sm: '20rem',
          smDown: '20rem',
        }}
        marginX={'auto'}
        fontWeight={'700'}
        fontSize={{ base: '1.5rem', mdDown: '1rem' }}
      >
        Recently Added Auctions:
      </Text>
      <Box
        position="relative"
        width={{
          base: '90rem',
          lg: '70rem',
          lgDown: '50rem',
          md: '40rem',
          mdDown: '40rem',
          sm: '20rem',
          smDown: '20rem',
        }}
        mx="auto"
        overflow="hidden"
        backgroundColor={"whiteAlpha.200"}
        py={6}
        px={9}
        rounded={"lg"}
        shadow={"sm"}
      >
        {isLoading ? (
          <Spinner size={'xl'} color={'teal'} borderWidth={'3px'} />
        ) : isError ? (
          <Text>{error.message}</Text>
        ) : data.length > 0 ? (
          <>
            <Icon
              position="absolute"
              cursor="pointer"
              top="45%"
              left="0px"
              transform="translateY(-50%)"
              zIndex={2}
              icon={<IoIosArrowBack />}
              onClick={() => scroll('left')}
              aria-label="Scroll Left"
              colorScheme="blue"
              backgroundColor="gray.600"
              rounded={10}
              size="2xl"
            >
              <IoIosArrowBack />
            </Icon>
            <Icon
              cursor="pointer"
              position="absolute"
              top="45%"
              right="0px"
              transform="translateY(-50%)"
              zIndex={2}
              icon={<IoIosArrowBack />}
              onClick={() => scroll('right')}
              aria-label="Scroll Left"
              colorScheme="blue"
              backgroundColor="gray.600"
              rounded={10}
              size="2xl"
            >
              <IoIosArrowForward />
            </Icon>
            <Box
              ref={scrollContainerRef}
              display="flex"
              overflowX="auto"
              gap={4}
              scrollBehavior="smooth"
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {data?.map((product) => (
                <CarouselItem
                  price={product.price}
                  link={`/product/${product.id}`}
                  key={product.id}
                  expireDate={product.expire}
                  image={product.pic}
                  isLiked={product.isLiked}
                  likeCount={1000}
                  title={product.title}
                />
              ))}
            </Box>
          </>
        ) : (
          <Text>No Item Found</Text>
        )}
      </Box>
    </>
  );
}
