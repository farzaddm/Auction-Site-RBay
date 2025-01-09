import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaYoutube, FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { ReactNode } from 'react'


const SocialButton = ({ children, label, href }) => {

  return (
    <chakra.button
      bg={"whiteAlpha.100"}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: "whiteAlpha.200",
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {

  const currentYear = new Date().getFullYear()
  const iconList = [
    <FaTelegram />, <FaGithub />, <FaLinkedin />, <FaInstagram />
  ]

  return (
    <Box
      bg={"gray.900"}
      marginTop={"2rem"}
      color={"gray.200"}>
      <Container
        as={Stack}
        w={"full"}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Text>RBay</Text>
        <Flex gap={"1.5rem"} direction={'row'} spacing={6}>
          <Box as="a" href={'#'} textDecoration={""}>
            Home
          </Box>
          <Box as="a" href={'#'}>
            About
          </Box>
          <Box as="a" href={'#'}>
            Blog
          </Box>
          <Box as="a" href={'#'}>
            Contact
          </Box>
        </Flex>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={"gray.200"}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© {currentYear} RBay Auctions. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            {
              iconList.map(icon => <Button
                bg={"whiteAlpha.100"}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                color={"whiteAlpha.600"}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                  bg: "whiteAlpha.200",
                }}>
                {icon}
              </Button>)
            }
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}