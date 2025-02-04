import {
  Box,
  Button,
  createListCollection,
  Flex,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Field } from '../components/ui/field';

function NewItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

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
          <form onSubmit={onSubmit}>
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
                  {...register('name', {
                    required: 'Item name is required',
                    minLength: {
                      value: 3,
                      message: 'Item name must be at laest 3 characters long.',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Item name must be at most 50 characters long.',
                    },
                  })}
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
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message:
                        'Description must be at least 10 characters long.',
                    },
                    maxLength: {
                      value: 250,
                      message:
                        'Description must be at most 250 characters long.',
                    },
                  })}
                />
              </Field>

              <Field
                mb={!errors.duration ? '1.3rem' : 0}
                label="Duration"
                invalid={!!errors.duration}
                errorText={errors.duration?.message}
              >
                <SelectRoot
                  rounded={'md'}
                  backgroundColor={'blackAlpha.700'}
                  _focus={{ backgroundColor: 'blackAlpha.900' }}
                  transition={'all .3s ease'}
                  collection={frameworks}
                  size="md"
                  {...register('duration', {
                    required: 'Time duration must be selected.',
                  })}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent position={'absolute'} width={'full'} top={16}>
                    {frameworks.items.map((d) => (
                      <SelectItem item={d} key={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Button type="submit">Submit</Button>
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
