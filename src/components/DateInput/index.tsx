import React, { forwardRef } from 'react';
import { Input, FormLabel, Flex } from '@chakra-ui/react';

interface DateInputProps {
  id: string;
  label: string;
  width?: string;
  height?: string;
  register: any;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({ id, label, width = '144px', height = '39px', register }, ref) => {
  return (
    <Flex alignItems="center" marginBottom="25px">
      <Input
        id={id}
        width={width}
        height={height}
        marginRight="8px"
        ref={ref}
        {...register}
      />
      <FormLabel fontSize="18px" fontWeight="bold" htmlFor={id}>{label}</FormLabel>
    </Flex>
  );
});

export default DateInput;
