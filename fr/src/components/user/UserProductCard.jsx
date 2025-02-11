import { Button, Card } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";

function UserProductCard() {
  return (
    <Card.Root width={{base:"15.5rem", lg:"18rem"}} variant={'outline'}>
      <Avatar
        src="https://realrealreal-redis.s3.amazonaws.com/155.jpg"
        name="Nue Camp"
        w={'full'}
        h={40}
        rounded={10}
        shape="rounded"
      />
      <Card.Body p={3}>
        <Card.Title>Nue Camp</Card.Title>
        <Card.Description>3 days left</Card.Description>
      </Card.Body>
      <Card.Footer p={4} pt={0}>
        <Button variant="outline">View</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default UserProductCard;
