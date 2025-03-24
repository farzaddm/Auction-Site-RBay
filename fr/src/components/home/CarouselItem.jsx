import { Button, Card, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dateFormatter from '../../query_client/dateReformater';

function CarouselItem({ image, expireDate, title, price, likeCount, isLiked, link }) {
  const navigate = useNavigate();
  const formattedDate = dateFormatter(expireDate)

  return (
    <Card.Root
      w={250}
      flex="0 0 auto"
      userSelect="none"
      boxShadow="md"
      border="none"
      backgroundColor="blackAlpha.900"
    >
      <Image
        src={image}
        alt={title}
        borderTopRightRadius="md"
        borderTopLeftRadius="md"
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{formattedDate}</Card.Description>
        <Card.Description>${ price.toFixed(2) }</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button
          variant="outline"
          backgroundColor="whiteAlpha.900"
          color="blackAlpha.700"
          _hover={{ borderColor: 'whiteAlpha.400' }}
          onClick={() => navigate(link)}
        >
          View
        </Button>
        <Flex ml={6} alignItems="center" gap={1}>
          <Icon
            as={FaHeart}
            boxSize={5}
            color={isLiked ? 'red.400' : 'gray.400'}
          />
          <Text color="whiteAlpha.700" fontSize="sm" fontWeight="medium">
            100K
          </Text>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}

export default CarouselItem;
