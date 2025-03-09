import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  Image,
  Icon,
  Text,
  Alert,
  Spinner,
} from '@chakra-ui/react';
import { FaRegEyeSlash, FaRegEye, FaUserAlt, FaLock } from 'react-icons/fa';
import { InputGroup } from '../components/ui/input-group';
import { Field } from '../components/ui/field';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../http/useHttp';
import { toaster, Toaster } from '../components/ui/toaster';

const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'user name must be at least 6 characters long.' }),
  password: z
    .string()
    .min(6, { message: 'password must be at least 6 characters long.' }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { data, mutate, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleShowClick = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
    setValue('password', '');
  };

  useEffect(() => {
    if (isError) {
      toaster.error({
        description: error.message,
      });
    }
  }, [isError]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="background.svg"
        width={'full'}
        height={'full'}
        zIndex={-100}
        position={'fixed'}
      />
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        p={{ base: 2, md: 5 }}
        rounded={'md'}
        backgroundColor={'gray.400/50'}
        alignItems="center"
        w={{ base: '90%', md: '70%', lg: '45%' }}
      >
        <Heading size={'4xl'} color="teal.400">
          Welcome Back!
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '90%' }}>
          <Stack
            spacing={4}
            p={8}
            px={{ base: 10, md: 16 }}
            rounded={'lg'}
            shadow={'md'}
            backgroundColor="teal.800/80"
            gap={4}
            w={'100%'}
          >
            <Field
              invalid={errors.username}
              errorText={errors.username?.message}
            >
              <InputGroup
                w="100%"
                startElement={<FaUserAlt color="gray.300" />}
              >
                <Input
                  type="text"
                  w={'100%'}
                  color={'whiteAlpha.800'}
                  backgroundColor={'blackAlpha.800'}
                  placeholder="User Name"
                  {...register('username')}
                />
              </InputGroup>
            </Field>
            <Field
              invalid={errors.password}
              errorText={errors.password?.message}
            >
              <InputGroup
                w="100%"
                startElement={<FaLock color="gray.300" />}
                endElement={
                  <Icon
                    onClick={handleShowClick}
                    color={'whiteAlpha.900'}
                    size={'md'}
                    transition="transform 0.3s ease-in-out"
                    transform={showPassword ? 'rotate(180deg)' : 'rotate(0deg)'}
                    cursor="pointer"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Icon>
                }
              >
                <Input
                  w={'100%'}
                  color={'whiteAlpha.800'}
                  backgroundColor="blackAlpha.800"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password')}
                />
              </InputGroup>
            </Field>
            <Text
              size={'md'}
              color={'teal.400'}
              cursor={'pointer'}
              _hover={{ textDecoration: 'underline' }}
              textAlign={'left'}
              onClick={() => navigate('/forgot-password')}
              userSelect={'none'}
            >
              Forgot Password?
            </Text>
            {isPending ? (
              <Box w={'full'} textAlign={'center'}>
                <Spinner size={'lg'} />
              </Box>
            ) : (
              <Button
                rounded={'md'}
                type="submit"
                variant="solid"
                width="full"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            )}

            {errors.root && (
              <Alert.Root status="error" textAlign={'start'}>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>{errors.root?.message}</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}
          </Stack>
        </form>
      </Stack>
      <Box>
        New to us?{' '}
        <Text
          fontWeight={'bold'}
          display={'inline'}
          color={'teal.500'}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline' }}
          textAlign={'left'}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Text>
      </Box>
      <Toaster />
    </Flex>
  );
}

export default LoginPage;
