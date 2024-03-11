import { useEffect, useState } from 'react';
import { Box, ChakraProvider, extendTheme, Flex, Button, Input, FormControl, FormLabel, Text, Select, Avatar } from '@chakra-ui/react';
import Header from "../../components/Header";
import { useRouter } from 'next/router';

const customTheme = extendTheme({
  fonts: {
    body: 'robot'
  },
});


interface Message {
  text: string;
  sender: string;
  avatar: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();

  // 返信メッセージを取得
  const fetchReplyMessage = async (inputMessage: string) => {
    try {
      const response = await fetch('http://localhost:3005/words');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      // キーワードを検索
      const keyword = data.find((item: { keyword: string }) => inputMessage.includes(item.keyword));
      if (keyword) {
        const autoReply: Message = {
          text: keyword.message,
          sender: 'Chat Bot',
          avatar: 'https://1.bp.blogspot.com/-unsJSo8n2rs/WxvKIHzgUEI/AAAAAAABMnA/ePQkMsfOPNYzYhljlq86h1YKdbinHfWigCLcBGAs/s800/job_telephone_operator_man_majime.png'
        };
        setMessages(prevMessages => [autoReply, ...prevMessages]);
      } else {
        // 検索ワードが見つからない場合、定型文を返す
        const autoReply: Message = {
          text: '申し訳ありませんが、該当する情報が見つかりませんでした。',
          sender: 'Chat Bot',
          avatar: 'https://1.bp.blogspot.com/-unsJSo8n2rs/WxvKIHzgUEI/AAAAAAABMnA/ePQkMsfOPNYzYhljlq86h1YKdbinHfWigCLcBGAs/s800/job_telephone_operator_man_majime.png'
        };
        setMessages(prevMessages => [autoReply, ...prevMessages]);
      }
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    if (router.query.message) {
      const inputMessage = router.query.message as string;
      fetchReplyMessage(inputMessage);
    }
  }, [router.query.message]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage: Message = {
      text: inputValue,
      sender: 'User',
      avatar: 'https://note.com/gentle_otter543/n/ncb492b05d446'
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setInputValue('');

    fetchReplyMessage(inputValue);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Header />
      <Box width="1244px" height="900px" backgroundColor="#EFF4EB" display="flex" flexDirection="column" alignItems="center">

        {/* チャット表示箇所 */}
        <Box width="1062px" height="415px" flex="1" overflowY="scroll" display="flex" flexDirection="column-reverse" >
          {messages.map((message, index) => (
            <Box key={index} display="flex" alignItems="center" marginBottom="10px" justifyContent={message.sender === 'User' ? 'flex-end' : 'flex-start'}>
              {message.sender === 'User' ? null : <Avatar src={message.avatar} size="sm" marginRight="5px" />}
              <Box backgroundColor="white" padding="10px" borderRadius="10px" marginLeft={message.sender === 'User' ? '5px' : '0'} marginRight={message.sender === 'User' ? '0' : '5px'} alignSelf={message.sender === 'User' ? 'flex-end' : 'flex-start'}>
                <Text>{message.text}</Text>
              </Box>
              {message.sender === 'User' ? <Avatar src={message.avatar} size="sm" marginRight="5px" /> : null}
            </Box>
          ))}
        </Box>

        {/* 送信欄 */}
        <Box display="flex" alignItems="center" justifyContent="flex-end" padding="20px">
          <Input width="1062px" height="40px" flex="1" marginRight="10px" backgroundColor="white" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button colorScheme="blue" onClick={handleSendMessage}>送信</Button>
        </Box>

      </Box>
    </ChakraProvider>
  );
}

export default ChatPage;
