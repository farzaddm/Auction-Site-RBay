import { Box, Input, Button, Text, VStack, Spinner, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { useGetChat, usePostChat } from '../../http/useHttp';
import { Toaster, toaster } from '../ui/toaster';

function Chat({ itemId }) {
  const { data, isLoading, isError, error } = useGetChat(itemId);
  const {
    isError: isPostError,
    error: postError,
    mutate,
    isPending,
  } = usePostChat(itemId);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isPending) toaster.error({ title: postError.message });
  }, [isPostError]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    const userId = localStorage.getItem('userId');
    mutate({ userId, message: message });
    setMessage('');
  };

  return (
    <VStack
      width={{ base: '80%', lg: '40%' }}
      height="500px"
      maxHeight="500px"
      spacing={4}
      align="stretch"
    >
      <Box
        overflowY="auto"
        flex={1}
        p={3}
        backgroundColor="whiteAlpha.300"
        borderRadius="md"
      >
        {isLoading ? (
          <Spinner size={'xl'} color={'teal.500'} borderWidth={'4px'} mt={10} />
        ) : isError ? (
          <Heading mt={5} color={'red'}>{error.message}</Heading>
        ) : (
          <>
            <Box>
              {data ? (
                data.map((item) => (
                  <ChatItem
                    key={item.id}
                    user={item.User}
                    message={item.message}
                  />
                ))
              ) : (
                <Text>There is no chat here</Text>
              )}
            </Box>

            <Box display="flex" gap={2}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                backgroundColor="whiteAlpha.500"
                borderColor="gray.300"
                _focus={{ borderColor: 'teal.500' }}
              />
              {isPending ? (
                <Spinner />
              ) : (
                <Button onClick={handleSendMessage} colorScheme="teal" px={6}>
                  Send
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
      <Toaster />
    </VStack>
  );
}

export default Chat;
