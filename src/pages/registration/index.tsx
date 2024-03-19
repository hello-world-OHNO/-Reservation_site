import React, { useState, useEffect } from 'react';
import { Box, Button, ChakraProvider, extendTheme, Flex, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import Header from "@/components/Header";
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';

const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

const Registration = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Firebaseの初期化
    const firebaseConfig = {
      apiKey: "AIzaSyAcUBYXQFjcBq9TowGj0j5I9MNEIihAQjE",
      authDomain: "reservation-certification.firebaseapp.com",
      projectId: "reservation-certification",
      storageBucket: "reservation-certification.appspot.com",
      messagingSenderId: "235419270622",
      appId: "1:235419270622:web:b75c82c72ff9ea3e3df14f"
    };
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const authInstance: Auth = getAuth(app);
    setAuth(authInstance);
  }, []);

  const handleRegistration = async () => {
    try {
      if (!auth) return;
      await createUserWithEmailAndPassword(auth, email, password,);
      console.log('User registered successfully');
      console.log(email, password)
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="750px" backgroundColor="#FBF7F7">
            <Flex flexDirection="column" alignItems="center">
              <h2 style={{ fontWeight: 'bold', fontSize: '36px', marginTop: "80px" }}>会員登録</h2>
              <Flex justifyContent="center" borderRadius="md" border="1px" borderColor="#dcdcdc" width="450px" height="450px" marginTop="30px" backgroundColor="white">
                <Box width="350px" height="100%">

                  <FormLabel id="mailAddress" fontSize="20px" fontWeight="bold" marginTop="30px">メールアドレス</FormLabel>
                  <Input id='mailAddress' backgroundColor="white" value={email} onChange={(e) => setEmail(e.target.value)} />

                  <FormLabel id="userName" fontSize="20px" fontWeight="bold" marginTop="30px">ユーザー名</FormLabel>
                  <Input id='userName' backgroundColor="white" value={userName} onChange={(e) => setUserName(e.target.value)} />

                  <FormLabel id="pass" fontSize="20px" fontWeight="bold" marginTop="30px">パスワード</FormLabel>
                  <Input id='pass' backgroundColor="white" value={password} onChange={(e) => setPassword(e.target.value)} />

                  <Button width="100%" height="50px" colorScheme='blue' marginTop="15px" marginBottom="20px" onClick={handleRegistration}>登録</Button>
                  <Link href='http://localhost:3000/login' color="blue" marginLeft="220px" >ログインはこちら</Link>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Registration;
