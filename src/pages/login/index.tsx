import React, { useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import Header from "@/components/Header";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';

// Firebaseの初期化
// 初期化されてない時のみ初期化
if (!getApps().length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAcUBYXQFjcBq9TowGj0j5I9MNEIihAQjE",
    authDomain: "reservation-certification.firebaseapp.com",
    projectId: "reservation-certification",
    storageBucket: "reservation-certification.appspot.com",
    messagingSenderId: "235419270622",
    appId: "1:235419270622:web:b75c82c72ff9ea3e3df14f"
  };
  initializeApp(firebaseConfig);
}
const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log('User logged in successfully');
      // login関数を呼び出す  
      login();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <ChakraProvider theme={customTheme}>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="750px" backgroundColor="#FBF7F7">
            <Flex flexDirection="column" alignItems="center">
              <h2 style={{ fontWeight: 'bold', fontSize: '36px', marginTop: "80px" }}>ログイン</h2>
              <Flex justifyContent="center" borderRadius="md" border="1px" borderColor="#dcdcdc" width="450px" height="450px" marginTop="30px" backgroundColor="white">
                <Box width="350px" height="100%">
                  <FormControl>
                    <FormLabel id="mailaddress" fontSize="20px" fontWeight="bold" marginTop="30px">メールアドレス</FormLabel>
                    <Input id='mailaddress' backgroundColor="white" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="pass" fontSize="20px" fontWeight="bold" marginTop="30px">パスワード</FormLabel>
                    <Input id='pass' backgroundColor="white" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                  </FormControl>
                  <Button width="100%" height="50px" colorScheme='blue' marginTop="80px" marginBottom="20px" onClick={handleLogin}>ログイン</Button>
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
