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
import {
  FaRegEyeSlash,
  FaRegEye,
  FaUserAlt,
  FaLock,
  FaEnvelope,
} from 'react-icons/fa';
import { toaster, Toaster } from '../components/ui/toaster';
import { InputGroup } from '../components/ui/input-group';
import { Field } from '../components/ui/field';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '../http/useHttp';

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' }),
    email: z.string().email({ message: 'Email is not valid.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  });

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, error, isError, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleShowClick = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
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
        p={5}
        rounded={'md'}
        backgroundColor={'gray.400/50'}
        alignItems="center"
        w={'45%'}
      >
        <Heading size={'4xl'} color="teal.400">
          Join Us!
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '90%' }}>
          <Stack
            spacing={4}
            p={8}
            px={16}
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
                  placeholder="Username"
                  {...register('username')}
                />
              </InputGroup>
            </Field>
            <Field invalid={errors.email} errorText={errors.email?.message}>
              <InputGroup
                w="100%"
                startElement={<FaEnvelope color="gray.300" />}
              >
                <Input
                  type="email"
                  w={'100%'}
                  color={'whiteAlpha.800'}
                  backgroundColor={'blackAlpha.800'}
                  placeholder="Email address"
                  {...register('email')}
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
            <Field
              invalid={errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            >
              <InputGroup w="100%" startElement={<FaLock color="gray.300" />}>
                <Input
                  w={'100%'}
                  color={'whiteAlpha.800'}
                  backgroundColor="blackAlpha.800"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                />
              </InputGroup>
            </Field>
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
                Sign Up
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
        Already have an account?{' '}
        <Text
          fontWeight={'bold'}
          display={'inline'}
          color={'teal.500'}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline' }}
          textAlign={'left'}
          onClick={() => navigate('/login')}
        >
          Login
        </Text>
      </Box>
      <Toaster />
    </Flex>
  );
}

export default SignupPage;
