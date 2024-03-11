import React from 'react';
import { Flex, Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex justifyContent="space-between"
      maxWidth="1244px"
      height="48px"
      marginBottom="5px"
    >
      <Box display="flex" alignItems="center" padding="28px">
        <a href='http://localhost:3000' style={{ fontWeight: 'bold' }}>HW RVS</a>
        <img src="https://s3-alpha-sig.figma.com/img/88be/68ec/6d20c215c54a0d32fc4ce916abd0b045?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=diCVzyX2p-kIfOjiZOWwBv6KGGpOSpsCy~y4Ms7PtQo4jmPP4RQTm1yeHQXMkA0IApaYXVyKb5vC7pJ4WNPWSO~JwMWUdZi6-x6etw1a32fUNO2Rl~1gi4En139AmqliGr3GFp0Sexj44CN3vygv7m3f4cXF2ryDIJZ2XOj7k3JOCbbSLYQhKgl6J9910MnFREHko7ToCZejXqFcPq-SG5eNip7m5myWO6e3h-Zp5Q8B-271jDSQPN2J6Ey7qrzI86UZDAh63pFvm1B7o7-pNHygVPCbdJ3wXGWD1HiDqb168UkjU97TSDn0XxkuPNNYoU9Y5JngCWpmh8urPvw2Dg__"
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
