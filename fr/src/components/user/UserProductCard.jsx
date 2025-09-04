import { Box, Button, Card, Heading } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import formatTimeLeft from '../../query_client/dateReformater';
import { useNavigate } from 'react-router-dom';

function UserProductCard({ name, price, pic, duration, id, createdAt }) {
  const navigate = useNavigate();

  return (
    <Card.Root width={{ base: '15.5rem', lg: '18rem' }} variant={'outline'}>
      <Avatar
        src={pic}
        name={name}
        w={'full'}
        h={40}
        rounded={10}
        shape="rounded"
      />
      <Card.Body p={3}>
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          <Box>
            <Heading>{price}$</Heading>
            {formatTimeLeft(createdAt, duration)}
          </Box>
        </Card.Description>
      </Card.Body>
      <Card.Footer p={4} pt={0}>
        <Button variant="outline" onClick={() => navigate(`/product/${id}`)}>
          View
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default UserProductCard;
