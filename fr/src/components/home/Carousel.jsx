import { Box, Icon, IconButton, Text } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef } from 'react';
import CarouselItem from './CarouselItem';

export default function Carousel() {
  const scrollContainerRef = useRef(null);

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
        py={6}
      >
        <Icon
          position="absolute"
          cursor="pointer"
          top="45%"
          left="10px"
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
          right="10px"
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
          {products.map((product, index) => (
            <CarouselItem
              price={30}
              link={'/product'}
              key={index}
              expireDate={product.expireDate}
              image={product.image}
              isLiked={true}
              likeCount={1000}
              title={product.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

const products = [
  {
    title: 'Product 1',
    image: '/test.avif',
    price: '$10',
    expireDate: '1 day later',
  },
  {
    title: 'Product 2',
    image: '/test.avif',
    price: '$15',
    expireDate: '1 day later',
  },
  {
    title: 'Product 3',
    image: '/test.avif',
    price: '$20',
    expireDate: '1 day later',
  },
  {
    title: 'Product 4',
    image: '/test.avif',
    price: '$25',
    expireDate: '1 day later',
  },
  {
    title: 'Product 5',
    image: '/test.avif',
    price: '$30',
    expireDate: '1 day later',
  },
  {
    title: 'Product 1',
    image: '/test.avif',
    price: '$10',
    expireDate: '1 day later',
  },
  {
    title: 'Product 2',
    image: '/test.avif',
    price: '$15',
    expireDate: '1 day later',
  },
  {
    title: 'Product 3',
    image: '/test.avif',
    price: '$20',
    expireDate: '1 day later',
  },
  {
    title: 'Product 4',
    image: '/test.avif',
    price: '$25',
    expireDate: '1 day later',
  },
  {
    title: 'Product 5',
    image: '/test.avif',
    price: '$30',
    expireDate: '1 day later',
  },
];
