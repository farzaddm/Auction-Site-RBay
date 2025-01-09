import { Button, Card, Image, Text } from "@chakra-ui/react"

function CarouselItem({ image, expireDate, title, price }) {
  return <Card.Root w={250} flex="0 0 auto" userSelect="none" boxShadow="md" border="none" backgroundColor="whiteAlpha.100" >
    <Image src={image} alt={title} borderTopRightRadius="md" borderTopLeftRadius="md" />
    <Card.Body gap="2">
      <Card.Title>{title}</Card.Title>
      <Card.Description>{expireDate}</Card.Description>
      <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">{price}</Text>
    </Card.Body>
    <Card.Footer gap="2">
      <Button variant="outline" backgroundColor="whiteAlpha.900" color="blackAlpha.700" _hover={{ borderColor: "whiteAlpha.400" }}>Buy now</Button>
      <Button variant="ghost" _hover={{ borderColor: "whiteAlpha.400" }}>Favorite</Button>
    </Card.Footer>
  </Card.Root>
}

export default CarouselItem