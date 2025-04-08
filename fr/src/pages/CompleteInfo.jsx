import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  createListCollection,
  Flex,
  Heading,
  Icon,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '../components/ui/field';
import { InputGroup } from '../components/ui/input-group';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useGetUser, usePostUserInfo } from '../http/useHttp';
import { toaster } from '../components/ui/toaster';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.union([
    z.string().min(6, 'Password must be at least 6 characters long.'),
    z.literal(''),
  ]),
  pic: z.string().optional().nullable(),
  birthDate: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format.',
    }),
  job: z.string().optional(),
  education: z.string().min(0),
  location: z.string().optional(),
});

function CompleteInfo() {
  const userId = sessionStorage.getItem('userId');
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { data, isSuccess, isError, isLoading, error } = useGetUser(userId);
  const {
    mutate,
    isPending,
    isError: isPostInfoError,
    error: postInfoError,
  } = usePostUserInfo(userId);

  useEffect(() => {
    if (data) {
      toaster.success({title: "data successfully loaded"})
      Object.keys(data).forEach((key) => {
        const value = key === 'education' ? data[key] || null : data[key];
        if (key === 'password') return;
        setValue(key, value || '');
      });
      if(data.pic) sessionStorage.setItem("pic", data.pic)
    }
  }, [data, isSuccess, setValue]);

  const onSubmit = (formData) => {
    const userId = sessionStorage.getItem("userId")
    if (!userId) {
      toaster.error({
        title: 'user not found. Please log in again',
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
    }
    try {
      if (formData?.pic) z.string().url().parse(formData.pic);
    } catch (err) {
      setError('pic', { message: 'Link must be valid' });
      return;
    }

    const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    mutate(cleanedData);
  };

  const handleShowClick = () => setShowPassword((prev) => !prev);

  return (
    <Box width={{ base: '90%', md: '75%', lg: '70%' }} mx={'auto'} pt={20}>
      <Box
        minH={'60vh'}
        rounded={'sm'}
        p={{ base: 5, sm: 10 }}
        backgroundColor={'gray.500/70'}
        mt={5}
      >
        <Box
          textAlign={'center'}
          width={'100%'}
          minH={'55vh'}
          rounded={'lg'}
          p={{ base: 5, md: 10 }}
          my={'auto'}
          mx={'auto'}
          backgroundColor={'teal.800/70'}
        >
          {isLoading || isPending ? (
            <Spinner size={'lg'} borderWidth={'3px'} color={'cyan'} mt={10} />
          ) : isError || isPostInfoError ? (
            <Heading color={'red'}>
              {error?.response?.data?.message ||
                postInfoError?.response?.data?.message}
            </Heading>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex gap="4" align={'center'} direction="column" mx={'auto'}>
                <Field
                  mb={!errors.name ? '1.3rem' : 0}
                  label="Name"
                  invalid={!!errors.name}
                  errorText={errors.name?.message}
                >
                  <Input
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('name')}
                  />
                </Field>

                <Field
                  mb={!errors.email ? '1.3rem' : 0}
                  label="Email"
                  invalid={!!errors.email}
                  errorText={errors.email?.message}
                >
                  <Input
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('email')}
                  />
                </Field>

                <Field
                  mb={!errors.password ? '1.3rem' : 0}
                  label="Password"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <InputGroup
                    w="100%"
                    endElement={
                      <Icon
                        onClick={handleShowClick}
                        color={'whiteAlpha.900'}
                        size={'md'}
                        transition="transform 0.3s ease-in-out"
                        transform={
                          showPassword ? 'rotate(180deg)' : 'rotate(0deg)'
                        }
                        cursor="pointer"
                        as={showPassword ? FaRegEyeSlash : FaRegEye}
                      />
                    }
                  >
                    <Input
                      w={'100%'}
                      color={'whiteAlpha.800'}
                      type={showPassword ? 'text' : 'password'}
                      _focus={{ backgroundColor: 'blackAlpha.900' }}
                      placeholder="Password"
                      backgroundColor={'blackAlpha.700'}
                      {...register('password')}
                    />
                  </InputGroup>
                </Field>

                <Field
                  mb={!errors.pic ? '1.3rem' : 0}
                  label="Profile Picture"
                  invalid={!!errors.pic}
                  errorText={errors.pic?.message}
                >
                  <Input
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('pic')}
                  />
                </Field>

                <Field
                  mb={!errors.birthDate ? '1.3rem' : 0}
                  label="Birth Date"
                  invalid={!!errors.birthDate}
                  errorText={errors.birthDate?.message}
                >
                  <Input
                    type="date"
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('birthDate')}
                  />
                </Field>

                <Field
                  mb={!errors.job ? '1.3rem' : 0}
                  label="Job"
                  invalid={!!errors.job}
                  errorText={errors.job?.message}
                >
                  <Input
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('job')}
                  />
                </Field>

                <Field
                  mb={!errors.education ? '1.3rem' : 0}
                  label="Education"
                  invalid={!!errors.education}
                  errorText={errors.education?.message}
                >
                  <Controller
                    name="education"
                    control={control}
                    render={({ field }) => (
                      <SelectRoot
                        name={field.name}
                        value={field.value ? [field.value] : []}
                        onValueChange={({ value }) =>
                          field.onChange(value[0] || null)
                        }
                        onInteractOutside={() => field.onBlur()}
                        collection={frameworks}
                        rounded={'md'}
                        backgroundColor={'blackAlpha.700'}
                        _focus={{ backgroundColor: 'blackAlpha.900' }}
                        transition={'all .3s ease'}
                        size="md"
                      >
                        <SelectTrigger>
                          <SelectValueText placeholder="Select Education" />
                        </SelectTrigger>
                        <SelectContent
                          position={'absolute'}
                          width={'full'}
                          top={16}
                        >
                          {frameworks.items.map((d) => (
                            <SelectItem
                              key={d.value}
                              item={d}
                              onSelect={() => field.onChange(d.value)}
                            >
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    )}
                  />
                </Field>

                <Field
                  mb={!errors.location ? '1.3rem' : 0}
                  label="Location"
                  invalid={!!errors.location}
                  errorText={errors.location?.message}
                >
                  <Input
                    backgroundColor={'blackAlpha.700'}
                    maxLength={70}
                    transition={'all .3s ease'}
                    _focus={{ backgroundColor: 'blackAlpha.900' }}
                    {...register('location')}
                  />
                </Field>

                <Button type="submit" mt={4}>
                  Submit
                </Button>
              </Flex>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CompleteInfo;

const frameworks = createListCollection({
  items: [
    { label: 'Diploma', value: 'diploma' },
    { label: "Bachelor's", value: 'bachelor' },
    { label: "Master's", value: 'master' },
    { label: 'PhD', value: 'phd' },
    { label: 'No Formal Education', value: 'no-formal-education' },
  ],
});
