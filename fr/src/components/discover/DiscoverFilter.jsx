import { Box, Button, Stack, createListCollection } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import DiscoverFilterSelect from './DiscoverFilterSelect';
import { Field } from '../ui/field';
import { Slider } from '../ui/slider';

const sort = createListCollection({
  items: [
    { label: 'Most Liked', value: 'liked' },
    { label: 'Hot Items', value: 'hot' },
    { label: 'Following', value: 'following' },
    { label: 'Favorite', value: 'favorite' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
  ],
});

const ending = createListCollection({
  items: [
    { label: 'In 1 hour', value: '1h' },
    { label: 'In 6 hours', value: '6h' },
    { label: 'In 1 day', value: '1d' },
    { label: 'In 3 days', value: '3d' },
    { label: 'In 1 week', value: '1w' },
    { label: 'In 2 weeks', value: '2w' },
    { label: 'In 1 month', value: '1m' },
  ],
});

const category = createListCollection({
  items: [
    { label: 'Decorative', value: 'decorative' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Toys', value: 'toys' },
    { label: 'Sports', value: 'sports' },
    { label: 'Automotive', value: 'automotive' },
  ],
});

const condition = createListCollection({
  items: [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' },
    { label: 'Refurbished', value: 'refurbished' },
  ],
});

function DiscoverFilter() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: '',
    defaultValues: { slider: [0, 30] },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Box
      width={{ base: '100%', md: '40%', lg: '30%' }}
      backgroundColor={'blackAlpha.700/70'}
      m={2}
      rounded={'md'}
      p={5}
      shadow={'md'}
    >
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start">
          <Controller
            name="slider"
            control={control}
            render={({ field }) => (
              <Field
                label={`price: from $${field.value[0].toFixed(
                  1
                )} to $${field.value[1].toFixed(1)} `}
                invalid={!!errors.value?.length}
                errorText={errors.value?.[0]?.message}
              >
                <Slider
                  colorPalette="teal"
                  width="full"
                  marks={[0, 25, 50, 75, 100]}
                  step={0.1}
                  onFocusChange={({ focusedIndex }) => {
                    if (focusedIndex !== -1) return;
                    field.onBlur();
                  }}
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                />
              </Field>
            )}
          />

          <DiscoverFilterSelect
            label={'Sort By'}
            collection={sort}
            control={control}
            errorMessage={errors.sort?.message}
            name={'sort'}
          />

          <DiscoverFilterSelect
            label={'Ending'}
            collection={ending}
            control={control}
            errorMessage={errors.ending?.message}
            name={'ending'}
          />

          <DiscoverFilterSelect
            label={'Category'}
            collection={category}
            control={control}
            errorMessage={errors.category?.message}
            name={'category'}
          />

          <DiscoverFilterSelect
            label={'Condition'}
            collection={condition}
            control={control}
            errorMessage={errors.condition?.message}
            name={'condition'}
          />

          <Button size="sm" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default DiscoverFilter;
