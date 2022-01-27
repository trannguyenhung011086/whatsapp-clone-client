import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ChatRoomScreen from './components/ChatRoomScreen';
import ChatsListScreen from './components/ChatsListScreen';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chats" element={<ChatsListScreen history={history} />} />
        <Route path="/chats/:chatId" element={<ChatRoomScreen />} />
        <Route path="/" element={<Navigate to="/chats" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
