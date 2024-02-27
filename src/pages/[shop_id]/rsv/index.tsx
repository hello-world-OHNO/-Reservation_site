import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button, Input, FormControl, FormLabel, Text, Select } from '@chakra-ui/react';
import Header from "../../../components/Header";
import { useForm } from "react-hook-form";

const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

// Shop情報型宣言
interface ShopInfo {
  shop_id: number;
  name: string;
  img: string;
}

// Form型宣言
interface FormData {
  firstName: string;
  lastName: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  mailAddress: string;
  reserveYear: number;
  reserveMonth: number;
  reserveDay: number;
  numberOfPeople: number;
  reserveTime: number;
}

const ShopRsvPage = () => {
  const router = useRouter();
  const { shop_id } = router.query;
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({ mode: 'onChange' });

  // 送信内容を保存
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    console.log(data);
  };


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
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="auto" backgroundColor="#FBF7F7">
            <h1 style={{ fontWeight: 'bold', fontSize: '48px', padding: "60px" }}>{shopInfo.name}</h1>
            <img src={shopInfo.img} alt={shopInfo.name} style={{ width: '720px', height: '287px', marginLeft: "60px", marginBottom: "25px" }} />
            <Flex flexDirection="column" alignItems="center" >
              <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: "25px" }}>予約者情報</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {(errors.firstName || errors.lastName) && <span style={{ color: 'red' }}>正しい名前を入力してください</span>}
                <Flex alignItems="center" marginBottom="25px">
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="firstName">性</FormLabel>
                  <Input id="firstName" width="144px" height="39px" marginRight="20px" {...register("firstName", { required: "未入力です", pattern: /!^[0-9０-９]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="lastName">名</FormLabel>
                  <Input id="lastName" width="144px" height="39px"  {...register("lastName", { required: "未入力です", pattern: /!^[0-9０-９]+$/ })} />
                </Flex>
                {(errors.birthYear || errors.birthMonth || errors.birthDay) && <span style={{ color: 'red' }}>正しい生年月日を入力してください</span>}
                <Text fontSize="18px" fontWeight="bold" marginBottom="5px">生年月日</Text>
                <Flex alignItems="center" marginBottom="25px">
                  <Input id="birthYear" width="144px" height="39px" marginRight="8px" {...register("birthYear", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="birthYear">年</FormLabel>
                  <Input id="birthMonth" width="144px" height="39px" marginRight="8px" {...register("birthMonth", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="birthMonth">月</FormLabel>
                  <Input id="birthDay" width="144px" height="39px" marginRight="8px" {...register("birthDay", { required: "未入力です", pattern: /^(0[1-9]|[12][0-9]|3[01])+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="birthDay">日</FormLabel>
                </Flex>
                <FormControl id="mailAddress" marginBottom="25px">
                  {errors.mailAddress && <span style={{ color: 'red' }}>正しいメールアドレスを入力してください</span>}
                  <FormLabel fontSize="18px" fontWeight="bold">メールアドレス</FormLabel>
                  <Input id="mailAddress" width="604px" height="39px" {...register("mailAddress", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
                </FormControl>
                {(errors.reserveYear || errors.reserveMonth || errors.reserveDay) && <span style={{ color: 'red' }}>正しい予約日時を入力してください</span>}
                <Text fontSize="18px" fontWeight="bold" marginBottom="5px">予約日時</Text>
                <Flex alignItems="center" marginBottom="25px">
                  <Input id="reserveYear" width="144px" height="39px" marginRight="8px" {...register("reserveYear", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="reserveYear">年</FormLabel>
                  <Input id="reserveMonth" width="144px" height="39px" marginRight="8px" {...register("reserveMonth", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="reserveMonth">月</FormLabel>
                  <Input id="reserveDay" width="144px" height="39px" marginRight="8px" {...register("reserveDay", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="reserveDay">日</FormLabel>
                </Flex>
                <Flex alignItems="center" marginBottom="25px">
                  <Select width="144px" height="39px" placeholder='選択' fontSize="18px" fontWeight="bold" id='reserveTime' {...register("reserveTime", { required: "未入力です" })}>
                    <option value="00:00">00:00</option>
                    <option value="99:99">99:99</option>
                    <option value="24:59">24:59</option>
                  </Select>
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor='reserveDay'>から１時間を予約</FormLabel>
                </Flex>
                {errors.numberOfPeople && <span style={{ color: 'red' }}>正しい予約人数を入力してください</span>}
                <Flex alignItems="center" marginBottom="25px">
                  <Input id="numberOfPeople" width="144px" height="39px" marginRight="8px" {...register("numberOfPeople", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor="numberOfPeople">名</FormLabel>
                </Flex>
                <Flex justifyContent="center">
                  <Button type="submit" marginTop="20px" colorScheme="blue" fontSize="14px" width="90px" height="36px">
                    予約する
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default ShopRsvPage;