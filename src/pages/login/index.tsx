import { Box, ChakraProvider, extendTheme, Flex, Button, FormControl, FormLabel, Radio, RadioGroup, Text, Select, Input, Link } from '@chakra-ui/react';
import Header from "@/components/Header";

// フォント
const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

const Login = () => {

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="750px" backgroundColor="#FBF7F7">
            <Flex flexDirection="column" alignItems="center">
              <h2 style={{ fontWeight: 'bold', fontSize: '36px', marginTop: "80px" }}>ログイン</h2>
              <Flex justifyContent="center" borderRadius="md" border="1px" borderColor="#dcdcdc" width="450px" height="450px" marginTop="30px" backgroundColor="white">
                <Box width="350px" height="100%">
                  <FormLabel id="maladdress" fontSize="20px" fontWeight="bold" marginTop="30px">メールアドレス</FormLabel>
                  <Input id='mailaddress' backgroundColor="white"></Input>
                  <FormLabel id="pass" fontSize="20px" fontWeight="bold" marginTop="30px">パスワード</FormLabel>
                  <Input id='pass' backgroundColor="white"></Input>
                  <Button width="100%" height="50px" colorScheme='blue' marginTop="80px" marginBottom="20px">ログイン</Button>
                  <Link href='http://localhost:3000/registration' color="blue" marginLeft="220px" >会員登録はこちら</Link>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
};

export default Login;