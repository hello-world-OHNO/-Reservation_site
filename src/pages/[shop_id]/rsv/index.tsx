import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button, Input, FormControl, FormLabel, Text, Select } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import Header from "../../../components/Header";
import NameInput from "../../../components/NameInput"
import DateInput from "../../../components/DateInput"

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
// 予約可能時間型宣言
interface AvailableTime {
  times: {
    time: string;
    available: boolean;
  }[];
}
// Form型宣言
interface FormData {
  times: string;
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
  reserveTime: string;
}

const ShopRsvPage = () => {
  const router = useRouter();
  const { shop_id } = router.query;
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  // 予約可能時間のステート
  const [availableTimes, setAvailableTimes] = useState<AvailableTime | null>(null);
  // ボタン押下のステート
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // 送信メッセージのステート
  const [reservationMessage, setReservationMessage] = useState('');

  // フォーム
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onChange' });


  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        // shop情報の取得
        const response = await fetch(`http://localhost:3001/info/${shop_id}`);
        const shopData: ShopInfo = await response.json();
        setShopInfo(shopData);

        // 予約可能時間の取得
        const availableTimesResponse = await fetch(`http://localhost:3001/rsv/${shop_id}`);
        const availableTimesData: AvailableTime = await availableTimesResponse.json();
        setAvailableTimes(availableTimesData);

      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    if (shop_id) {
      fetchShopInfo();
    }
  }, [shop_id]);

  // 送信時の処理
  const onSubmit = async (data: FormData) => {
    console.log(data)
    // 予約完了メッセージを表示する
    setReservationMessage('予約が完了しました');
    // ボタンを非活性にする
    setIsButtonDisabled(true);
    // 選択された予約時間
    const selectedTime = data.reserveTime;
    // 新しい予約可能時間データを作成
    const updatedAvailableTimesData = availableTimes?.times.filter(timeObj => timeObj.time !== selectedTime) || [];
    // 予約可能時間の更新
    if (availableTimes) {
      setAvailableTimes({
        ...availableTimes,
        times: updatedAvailableTimesData
      });
    }
  };

  if (!shopInfo) {
    return <div>loading...</div>;
  }

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="auto" backgroundColor="#FBF7F7">

            {/* 店舗情報 */}
            <h1 style={{ fontWeight: 'bold', fontSize: '48px', padding: "60px" }}>{shopInfo.name}</h1>
            <img src={shopInfo.img} alt={shopInfo.name} style={{ width: '720px', height: '287px', marginLeft: "60px", marginBottom: "25px" }} />

            <Flex flexDirection="column" alignItems="center" >
              <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: "25px" }}>予約者情報</h2>
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* 名前 */}
                {(errors.firstName || errors.lastName) && <span style={{ color: 'red' }}>正しい名前を入力してください</span>}
                <Flex>
                  <NameInput id="firstName" label="姓" register={register("firstName", { required: "未入力です", pattern: /^[^\d]+$/ })} />
                  <NameInput id="firstName" label="名" register={register("lastName", { required: "未入力です", pattern: /^[^\d]+$/ })} />
                </Flex>

                {/* 生年月日 */}
                {(errors.birthYear || errors.birthMonth || errors.birthDay) && <span style={{ color: 'red' }}>正しい生年月日を入力してください</span>}
                <Text fontSize="18px" fontWeight="bold" marginBottom="5px">生年月日</Text>
                <Flex>
                  <DateInput id="birthYear" label="年" register={register("birthYear", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <DateInput id="birthMonth" label="月" register={register("birthMonth", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <DateInput id="birthDay" label="日" register={register("birthDay", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                </Flex>

                {/* メールアドレス */}
                <FormControl id="mailAddress" marginBottom="25px">
                  {errors.mailAddress && <span style={{ color: 'red' }}>正しいメールアドレスを入力してください</span>}
                  <FormLabel fontSize="18px" fontWeight="bold">メールアドレス</FormLabel>
                  <Input id="mailAddress" width="604px" height="39px" {...register("mailAddress", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
                </FormControl>

                {/* 予約日時 */}
                {(errors.reserveYear || errors.reserveMonth || errors.reserveDay) && <span style={{ color: 'red' }}>正しい予約日時を入力してください</span>}
                <Text fontSize="18px" fontWeight="bold" marginBottom="5px">予約日時</Text>
                <Flex>
                  <DateInput id="birthYear" label="年" register={register("reserveYear", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <DateInput id="birthMonth" label="月" register={register("reserveMonth", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                  <DateInput id="birthDay" label="日" register={register("reserveDay", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                </Flex>

                {/* 予約時間 */}
                <Flex alignItems="center" marginBottom="25px">
                  <Select {...register("reserveTime")} width="144px">
                    <option value="">選択</option>
                    {availableTimes && availableTimes.times && Array.isArray(availableTimes.times) &&
                      availableTimes.times.map((timeObj, index) => (
                        <option key={index} value={timeObj.time}>{timeObj.time}</option>
                      ))
                    }
                  </Select>
                  <FormLabel fontSize="18px" fontWeight="bold" htmlFor='reserveDay'>から１時間を予約</FormLabel>
                </Flex>

                {/* 予約人数 */}
                {errors.numberOfPeople && <span style={{ color: 'red' }}>正しい予約人数を入力してください</span>}
                <Flex>
                  <DateInput id="numberOfPeople" label="名" register={register("numberOfPeople", { required: "未入力です", pattern: /^[0-9]+$/ })} />
                </Flex>
                <Box textAlign="center">
                  {reservationMessage && <span>{reservationMessage}</span>}
                </Box>

                {/* 送信ボタン */}
                <Flex justifyContent="center">
                  <Button type="submit" marginTop="20px" colorScheme="blue" fontSize="14px" width="90px" height="36px" marginBottom="20px" isDisabled={isButtonDisabled} >
                    {isButtonDisabled ? '予約済み' : '予約する'}
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