import React from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
  buttonText: string;
  colorScheme?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  mt?: string;
  mb?: string;
}


const Btn = ({
  buttonText,
  colorScheme = 'blue',
  fontSize = '14px',
  width = '90px',
  height = '36px',
  mt = '20px',
  mb = '20px'
}: ButtonProps) => (
  <Button
    colorScheme={colorScheme}
    fontSize={fontSize}
    width={width}
    height={height}
    mt={mt}
    mb={mb}
  >
    {buttonText}
  </Button>
);

export default Btn;