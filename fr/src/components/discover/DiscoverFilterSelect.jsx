import { createListCollection } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { Controller } from 'react-hook-form';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../ui/select';

function DiscoverFilterSelect({
  errorMessage,
  control,
  name,
  collection,
  label,
}) {
  return (
    <Field label={label} errorText={errorMessage} >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            backgroundColor="teal.950"
            rounded="md"
            collection={collection}
          >
            <SelectTrigger>
              <SelectValueText placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {collection.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
}

export default DiscoverFilterSelect;
