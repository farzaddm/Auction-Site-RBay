import { Flex, Stack, Text } from "@chakra-ui/react"

function FeatureItem({ text, title, children }) {
  return (
    <Stack align="start" rounded="2xl" boxShadow={"sm"} height={{base:"17rem", mdDown:"19rem"}} width={{base:325, mdDown:450, smDown:300}} backgroundColor="whiteAlpha.200" border="none" p={4}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg="whiteAlpha.800"
        mb={1}
      >
      {children}  
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )

}

export default FeatureItem
