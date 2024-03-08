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
  address1: string;
  address2: string;
  access1: string;
  access2: string;
  phoneNumber: string;
  businessHours: string;
  regularHoliday: string;
  img: string;
}

const ShopDetailPage = () => {
  const router = useRouter();
  const { shop_id } = router.query as { shop_id: string };
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/info/${shop_id}`);
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
            <Flex marginTop="60px" width="720px" height="378px" marginLeft="60px" backgroundColor="white">
              <Box width="180px" height="428px">
                <div style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "40px", marginLeft: "17px", marginTop: "10px" }}>住所</div>
                <div style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "40px", marginLeft: "17px" }}>アクセス</div>
                <div style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "40px", marginLeft: "17px" }}>電話番号</div>
                <div style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "40px", marginLeft: "17px" }}>営業時間</div>
                <div style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "40px", marginLeft: "17px" }}>定休日</div>
              </Box>
              <Box width="690px" height="428px">
                <div style={{ fontSize: "20px", marginTop: "10px" }}>{shopInfo.address1}</div>
                <div style={{ fontSize: "20px" }}>{shopInfo.address2}</div>
                <div style={{ fontSize: "20px", marginTop: "20px" }}>{shopInfo.access1}</div>
                <div style={{ fontSize: "20px" }}>{shopInfo.access2}</div>
                <div style={{ fontSize: "20px", marginTop: "15px" }}>{shopInfo.phoneNumber}</div>
                <div style={{ fontSize: "20px", marginTop: "45px" }}>{shopInfo.businessHours}</div>
                <div style={{ fontSize: "20px", marginTop: "50px" }}>{shopInfo.regularHoliday}</div>
              </Box>
            </Flex>
            <Link href={`http://localhost:3000/${shop_id}/rsv`}>
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

export default ShopDetailPage;
