import { Box, Button, Container, Heading, Icon, Stack, Text } from "@chakra-ui/react"
import { GiArrowDunk } from "react-icons/gi"

function Hero() {
    return <Container maxW={'3xl'}>
        <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36, mdDown:36 }}>
            <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                Find the best deals on <br />
                <Text as={'span'} color={'green.400'}>
                    RBay Auctions
                </Text>
            </Heading>
            <Text color={'gray.500'} marginBottom={"2rem"}>
                Discover unique items and bid on products you love. Join our community of auction enthusiasts
                and win incredible deals on a wide range of products. Start bidding today!
            </Text>
            <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}
                gap=".5rem">
                <Button
                    colorScheme={'green'}
                    bg={'green.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                        bg: 'green.500',
                    }}>
                    Start Bidding
                </Button>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn How It Works
                </Button>
                <Box>
                    <Icon
                        w={71}
                        size={"2xl"}
                        position={'absolute'}
                        right={-74}
                        top={'20px'}
                        rotate={"120"}
                    >
                        <GiArrowDunk />
                    </Icon>
                    <Text
                        fontSize={'lg'}
                        fontFamily={'Caveat'}
                        position={'absolute'}
                        right={'-130px'}
                        top={'0px'}
                        transform={'rotate(10deg)'}>
                        Auctions starting at $1
                    </Text>
                </Box>
            </Stack>
        </Stack>
    </Container>
}

export default Hero