import React, { forwardRef } from 'react';
import { FormControl, FormLabel, Input, Textarea, Flex } from '@chakra-ui/react';

interface ContactInputProps {
  id: string;
  label: string;
  errorMessage?: string;
  inputType?: 'text' | 'textarea';
  register: any;
}

const ContactInput = forwardRef<HTMLInputElement, ContactInputProps>(({ id, label, inputType, register }, ref) => {
  return (
    <FormControl id={id} marginBottom="25px">
      <Flex justifyContent="space-between">
        <FormLabel fontSize="18px" fontWeight="bold">{label}</FormLabel>
        {inputType === 'text' && <Input id={id} width="420px" height="39px" {...register} />}
        {inputType === 'textarea' && <Textarea id={id} width="420px" height="180px" resize="vertical" placeholder='サービスについて。予約について' {...register} />}
      </Flex>
    </FormControl>
  );
});

export default ContactInput;
