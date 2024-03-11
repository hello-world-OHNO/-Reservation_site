import { Box, ChakraProvider, extendTheme, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../components/Header";

const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

interface Shop {
  shop_id: number;
  name: string;
  explainA: string;
  explainB: string;
  explainC: string;
  img: string;
}

const Home = () => {
  const [shopList, setShopList] = useState<Shop[]>([]);

  // 店舗情報取得
  useEffect(() => {
    const fetchShopList = async () => {
      try {
        const response = await fetch("http://localhost:3001/list");
        const data: Shop[] = await response.json();
        setShopList(data);
      } catch (error) {
        console.error('Error fetching shop list:', error);
      }
    }
    fetchShopList();
  }, []);

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Flex borderRadius="md" justifyContent="space-between" width="844px" height="1041px" padding="20px" backgroundColor="#FBF7F7">

            {/* shop一覧表示 */}
            <UnorderedList listStyleType="none" marginLeft="0px">
              {shopList.map((list) => (
                <ListItem key={list.shop_id} style={{ marginBottom: "50px" }}>
                  <Flex alignItems="center" borderRadius="md" backgroundColor={"white"} width="804px" height="156px" padding="18px">
                    <Link href={`${list.shop_id}/shop_detail`} >
                      <Flex alignItems="center">
                        <Box>
                          <img src={list.img} alt={list.name} style={{ width: '120px', height: '120px', marginRight: "16px" }} />
                        </Box>
                        <Box>
                          <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: "20px" }}>{list.name}</h2>
                          <p style={{ fontSize: '14px' }}>{list.explainA}</p>
                          <p style={{ fontSize: '14px' }}>{list.explainB}</p>
                          <p style={{ fontSize: '14px' }}>{list.explainC}</p>
                        </Box>
                      </Flex>
                    </Link>
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>

          </Flex>
        </Flex>
      </Box>
    </ChakraProvider >
  );
}

export default Home;