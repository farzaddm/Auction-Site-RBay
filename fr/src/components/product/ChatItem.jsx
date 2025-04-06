import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChatItem({ message, user }) {
  const navigate = useNavigate();

  return (
    <VStack
      p={3}
      my={2}
      textAlign="start"
      backgroundColor="teal.600"
      borderRadius="md"
      width="100%"
      align="start"
    >
      <Heading
        color={'whiteAlpha.900'}
        width="full"
        onClick={() => navigate(`/user/${user.id}`)}
        pl={3}
        textAlign="left"
        fontSize="lg"
      >
        {user.username}
      </Heading>
      <Text
        width="100%"
        color={'whiteAlpha.700'}
        wordBreak="break-word"
        overflowWrap="break-word"
      >
        {message}
      </Text>
    </VStack>
  );
}

export default ChatItem;
