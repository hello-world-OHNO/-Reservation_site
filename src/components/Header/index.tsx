import React from 'react';
import { Flex, Box } from "@chakra-ui/react";

const Header = () => {
  return (
    // Headerを中央揃えにする
    <Flex justifyContent="space-between" alignItems="center" maxWidth="1244px" height="48px" margin="0 auto" marginBottom="5px">
      <Box display="flex" alignItems="center" padding="28px">
        <a href='http://localhost:3000' style={{ fontWeight: 'bold' }}>HW RVS</a>
        <img src="/assets/images/rsv_logo.png"
          alt="logo" width="48px" height="33px" />
      </Box>
      <Box display="flex" alignItems="center" padding="28px">
        <a href="http://localhost:3000" style={{ padding: '12px', textDecoration: "none", color: "black" }} >店舗一覧</a>
        <a href="http://localhost:3000/contact" style={{ padding: '12px', textDecoration: "none", color: "black" }}>お問い合わせ</a>
        <a href="http://localhost:3000/chat" style={{ padding: '12px', textDecoration: "none", color: "black" }}>chat</a>
        <a href="http://localhost:3000/login" style={{ padding: '12px', textDecoration: "none", color: "black" }}>ログイン</a>
      </Box>
    </Flex>
  );
}

export default Header;
