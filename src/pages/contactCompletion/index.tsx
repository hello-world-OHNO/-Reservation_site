import { Box, ChakraProvider, extendTheme, Flex, Button, FormControl, FormLabel, Radio, RadioGroup, Text, Select } from '@chakra-ui/react';
import Header from "@/components/Header";

// フォント
const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

const ContactCompletionPage = () => {

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="327px" backgroundColor="#FBF7F7">
            <Flex flexDirection="column" alignItems="center">
              <h2 style={{ fontWeight: 'bold', fontSize: '36px', marginTop: "80px" }}>お問合わせが完了しました。</h2>
              <a href="http://localhost:3000" style={{ fontWeight: 'bold', fontSize: '36px', marginTop: "42px", textDecoration: "none", color: "#35B2DA" }} >TOPへ戻る</a>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
};

export default ContactCompletionPage;