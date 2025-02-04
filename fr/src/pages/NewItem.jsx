import {
  Box,
  Button,
  createListCollection,
  Flex,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { Field } from '../components/ui/field';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Item name must be at least 3 characters long.')
    .max(50, 'Item name must be at most 50 characters long.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long.')
    .max(250, 'Description must be at most 250 characters long.'),
  duration: z.string({ message: 'Time duration must be selected.' }).array(),
});

function NewItem() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 1000);
    });
  };

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
                mb={!errors.description ? '1.3rem' : 0}
                label="Description"
                invalid={!!errors.description}
                errorText={errors.description?.message}
              >
                <Textarea
                  resize={'none'}
                  maxLength={300}
                  h={'20'}
                  backgroundColor={'blackAlpha.700'}
                  _focus={{ backgroundColor: 'blackAlpha.900' }}
                  transition={'all .3s ease'}
                  {...register('description')}
                />
              </Field>

              <Field
                mb={!errors.duration ? '1.3rem' : 0}
                label="Duration"
                invalid={!!errors.duration}
                errorText={errors.duration?.message}
              >
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={frameworks}
                      rounded={'md'}
                      backgroundColor={'blackAlpha.700'}
                      _focus={{ backgroundColor: 'blackAlpha.900' }}
                      transition={'all .3s ease'}
                      size="md"
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Duration" />
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

              {isSubmitting ? (
                <Spinner size={'md'} borderWidth="3px" m={2} />
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

const frameworks = createListCollection({
  items: [
    { label: 'One Minute', value: 'one minute' },
    { label: 'Ten Minute', value: 'ten minute' },
    { label: 'One Day', value: 'one day' },
    { label: 'One Week', value: 'one week' },
  ],
});

export default NewItem;
