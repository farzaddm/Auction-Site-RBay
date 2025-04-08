import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { useGetChat, usePostChat } from '../../http/useHttp';
import { Toaster, toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';

function Chat({ itemId }) {
  const { data, isLoading, isError, error } = useGetChat(itemId);
  const navigate = useNavigate()
  const {
    isError: isPostError,
    error: postError,
    mutate,
    isPending,
  } = usePostChat(itemId);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isPostError) {
      if (postError.response.status == 401) {
        toaster.error({
          title: postError.response.data.error,
          description: (
            <Button
              onClick={() => navigate('/login')}
              variant={'solid'}
              colorPalette={'white'}
            >
              Login
            </Button>
          ),
        });
      } else {
        toaster.error({ title: postError.response.data.error });
      }
    }
  }, [isPostError]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      toaster.create({
        title: 'Please log in to send chat',
        description: (
          <Button
            onClick={() => navigate('/login')}
            variant={'solid'}
            colorPalette={'white'}
          >
            Login
          </Button>
        ),
        type: 'warning',
      });
      return;
    }

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
          <Heading mt={5} color={'red'}>
            {error.message}
          </Heading>
        ) : (
          <>
            <Box height={400} my={3} overflowY="auto">
              {data ? (
                data.map((item) => (
                  <ChatItem
                    key={item.id}
                    user={item.user}
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
                <Spinner size={'lg'} />
              ) : (
                <Button onClick={handleSendMessage} colorScheme="teal" px={6}>
                  Send
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
      {/* <Toaster /> */}
    </VStack>
  );
}

export default Chat;
