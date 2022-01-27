import React from 'react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const getChatQuery = `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen = () => {
  let [chat, setChat] = useState<OptionalChatQueryResult>(null);
  let { chatId } = useParams();

  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getChatQuery,
        variables: { chatId },
      }),
    });
    const {
      data: { chat },
    } = await body.json();
    setChat(chat);
  }, [chatId]);

  if (!chat) return null;

  return (
    <div>
      <img src={chat.picture} alt="Profile" />
      <div>{chat.name}</div>
      <ul>
        {chat.messages.map((message) => (
          <li key={message.id}>
            <div>{message.content}</div>
            <div>{message.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomScreen;
