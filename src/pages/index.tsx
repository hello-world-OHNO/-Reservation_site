import { Box, ChakraProvider, extendTheme, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function Home() {
  const [shopList, setShopList] = useState<Shop[]>([]);
  // アロー関数、関数切り出し
  useEffect(() => {
    async function fetchShopList() {
      try {
        const response = await fetch("http://localhost:3001/shops");
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
          <Flex borderRadius="md" justifyContent="space-between" width="844px" maxHeight="1041px" backgroundColor="#FBF7F7">
            <UnorderedList listStyleType="none">
              {shopList.map((shop) => (
                <ListItem key={shop.shop_id}>
                  <Link href={`${shop.shop_id}/shop_detail`}>
                    <Box display="flex" padding="20px">
                      <Box display="flex" alignItems="center" marginRight="18px">
                        <img src={shop.img} alt={shop.name} style={{ width: '120px', height: '120px' }} />
                      </Box>
                      <Box>
                        <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: "20px" }}>{shop.name}</h2>
                        <p style={{ fontSize: '14px' }}>{shop.explainA}</p>
                        <p style={{ fontSize: '14px' }}>{shop.explainB}</p>
                        <p style={{ fontSize: '14px' }}>{shop.explainC}</p>
                      </Box>
                    </Box>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
