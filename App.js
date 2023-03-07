import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const chatbotApi = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL da API Python FastAPI
  timeout: 1000,
});

const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleInputTextChange = (text) => {
    setInputText(text);
  };

  const handleButtonClick = async () => {
    try {
      const response = await chatbotApi.post('/chatbot', {
        input_text: inputText,
      });
      setResponseText(response.data.response_text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Chatbot</Text>
      </View>
      <View>
        <TextInput
          placeholder="Digite sua mensagem"
          value={inputText}
          onChangeText={handleInputTextChange}
        />
        <Button title="Enviar" onPress={handleButtonClick} />
      </View>
      <View>
        <Text>{responseText}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chatbot;
