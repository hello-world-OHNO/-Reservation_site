import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button } from '@chakra-ui/react';
import Header from "../../../components/Header";
import Link from 'next/link';

const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

interface ShopInfo {
  shop_id: number;
  name: string;
  img: string;
}

const ShopRsvPage = () => {
  const router = useRouter();
  const { shop_id } = router.query;
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3002/${shop_id}`);
        const data = await response.json();
        setShopInfo(data);
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    fetchShopInfo();
  }, [shop_id]);

  if (!shopInfo) {
    return <div>error!!</div>;
  }

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="1041px" backgroundColor="#FBF7F7">
            <h1 style={{ fontWeight: 'bold', fontSize: '48px', padding: "60px" }}>{shopInfo.name}</h1>
            <img src={shopInfo.img} alt={shopInfo.name} style={{ width: '720px', height: '287px', marginLeft: "60px" }} />
            <Box border="1px" marginTop="60px" width="720px" height="378px" marginLeft="60px">
              <Flex flexDirection="column" alignItems="center" >
                <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>予約者情報</h2>
              </Flex>

            </Box>
            <Link href={`/${shop_id}/rsv`}>
              <Flex justifyContent="center">
                <Button marginTop="40px" marginBottom="20px" colorScheme="blue" fontSize="14px" width="90px" height="36px">
                  予約する
                </Button>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
export default ShopRsvPage;