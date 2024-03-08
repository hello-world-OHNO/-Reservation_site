import React, { forwardRef } from 'react';
import { Input, FormLabel, Flex } from '@chakra-ui/react';

interface NameInputProps {
  id: string;
  label: string;
  width?: string;
  height?: string;
  register: any;
}

const NameInput = forwardRef<HTMLInputElement, NameInputProps>(({ id, label, width = '144px', height = '39px', register }, ref) => {
  return (
    <Flex alignItems="center" marginRight="8px" marginBottom="25px">
      <FormLabel fontSize="18px" fontWeight="bold" htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        width={width}
        height={height}
        ref={ref}
        {...register}
      />
    </Flex>
  );
});

export default NameInput;
