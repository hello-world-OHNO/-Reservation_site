import { useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button, FormControl, FormLabel, Radio, RadioGroup, Text, Select, Link } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import ContactInput from "../../components/ContactInput"

// フォント
const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});

// Form型宣言
interface ContactData {
  name: string;
  mailAddress: string;
  corporateName: string;
  content: string;
  prefecture: string;
  gender: string;
}

const ContactPage = () => {
  // ボタンの非活性状態を管理するステート
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // フォーム
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactData>({ mode: 'onChange' });

  // 送信時の処理
  const onSubmit = async (data: ContactData) => {
    // ボタンを非活性にする
    setIsButtonDisabled(true);

    console.log("Form submitted!", data);
  };

  return (
    <ChakraProvider>
      <Header />
      <Box margin="62px 16%">
        <Flex flexDirection="column" alignItems="center" >
          <Box borderRadius="md" justifyContent="space-between" width="844px" height="750px" backgroundColor="#FBF7F7">
            <h2 style={{ fontWeight: 'bold', fontSize: '24px', padding: "25px", marginLeft: "70px" }}>CONTACT</h2>
            <Flex flexDirection="column" alignItems="center" >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box backgroundColor="white" borderRadius="md" padding="32px">

                  {/* 名前 */}
                  {(errors.name) && <span style={{ color: 'red' }}>正しい名前を入力してください</span>}
                  <ContactInput id="name" inputType='text' label="氏名" register={register("name", { required: "未入力です", pattern: /^[^\d]+$/ })} />

                  {/* メールアドレス */}
                  {(errors.mailAddress) && <span style={{ color: 'red' }}>正しいメールアドレスを入力してください</span>}
                  <ContactInput id="mailAddress" inputType='text' label="メールアドレス" register={register("mailAddress", { required: "未入力です", pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />

                  {/* 法人名 */}
                  {(errors.corporateName) && <span style={{ color: 'red' }}>正しい法人名を入力してください</span>}
                  <ContactInput id="corporateName" inputType='text' label="法人名" register={register("corporateName", { required: "未入力です", pattern: /^[^\d]+$/ })} />

                  {/* 都道府県 */}
                  <FormControl id="prefecture" marginBottom="25px">
                    {errors.prefecture && <span style={{ color: 'red' }}>正しい都道府県を選択してください</span>}
                    <Flex justifyContent="space-between">
                      <FormLabel fontSize="18px" fontWeight="bold">都道府県</FormLabel>
                      <Select id="prefecture" width="420px" height="39px" {...register("prefecture", { required: "未入力です" })}>
                        <option value="">選択してください</option>
                        <option value="北海道">北海道</option>
                        <option value="青森県">青森県</option>
                        <option value="岩手県">岩手県</option>
                        <option value="宮城県">宮城県</option>
                        <option value="秋田県">秋田県</option>
                        <option value="山形県">山形県</option>
                        <option value="福島県">福島県</option>
                        <option value="茨城県">茨城県</option>
                        <option value="栃木県">栃木県</option>
                        <option value="群馬県">群馬県</option>
                        <option value="埼玉県">埼玉県</option>
                        <option value="千葉県">千葉県</option>
                        <option value="東京都">東京都</option>
                        <option value="神奈川県">神奈川県</option>
                        <option value="新潟県">新潟県</option>
                        <option value="富山県">富山県</option>
                        <option value="石川県">石川県</option>
                        <option value="福井県">福井県</option>
                        <option value="山梨県">山梨県</option>
                        <option value="長野県">長野県</option>
                        <option value="岐阜県">岐阜県</option>
                        <option value="静岡県">静岡県</option>
                        <option value="愛知県">愛知県</option>
                        <option value="三重県">三重県</option>
                        <option value="滋賀県">滋賀県</option>
                        <option value="京都府">京都府</option>
                        <option value="大阪府">大阪府</option>
                        <option value="兵庫県">兵庫県</option>
                        <option value="奈良県">奈良県</option>
                        <option value="和歌山県">和歌山県</option>
                        <option value="鳥取県">鳥取県</option>
                        <option value="島根県">島根県</option>
                        <option value="岡山県">岡山県</option>
                        <option value="広島県">広島県</option>
                        <option value="山口県">山口県</option>
                        <option value="徳島県">徳島県</option>
                        <option value="香川県">香川県</option>
                        <option value="愛媛県">愛媛県</option>
                        <option value="高知県">高知県</option>
                        <option value="福岡県">福岡県</option>
                        <option value="佐賀県">佐賀県</option>
                        <option value="長崎県">長崎県</option>
                        <option value="熊本県">熊本県</option>
                        <option value="大分県">大分県</option>
                        <option value="宮崎県">宮崎県</option>
                        <option value="鹿児島県">鹿児島県</option>
                        <option value="沖縄県">沖縄県</option>
                      </Select>
                    </Flex>
                  </FormControl>

                  {/* 性別 */}
                  <RadioGroup id="gender" marginBottom="25px">
                    <Flex>
                      <Text fontSize="18px" fontWeight="bold" marginRight="115px">性別</Text>
                      <Box display="flex" alignItems="center" marginRight="32px">
                        <Box as="label" htmlFor="men" ml={2} fontSize="18px" fontWeight="bold" marginRight="8px">
                          男性
                        </Box>
                        <Radio value="men" id="men" {...register("gender")} />
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Box as="label" htmlFor="women" ml={2} fontSize="18px" fontWeight="bold" marginRight="8px">
                          女性
                        </Box>
                        <Radio value="women" id="women" {...register("gender")} />
                      </Box>
                    </Flex>
                  </RadioGroup>

                  {/* お問い合わせ内容 */}
                  {(errors.content) && <span style={{ color: 'red' }}>お問い合わせ内容を入力してください</span>}
                  <ContactInput id="content" inputType='textarea' label="お問い合わせ内容" register={register("content", { required: "未入力です", pattern: /^[^\d]+$/ })} />

                </Box>

                {/* 送信ボタン */}
                <Link href={"http://localhost:3000/contactCompletion"}>
                  <Flex flexDirection="column" alignItems="center" >
                    <Button marginTop="20px" colorScheme="blue" fontSize="14px" width="90px" height="36px" marginBottom="20px" isDisabled={isButtonDisabled} >
                      {isButtonDisabled ? '送信済み' : '送信'}
                    </Button>
                  </Flex>
                </Link>


              </form>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
};

export default ContactPage;