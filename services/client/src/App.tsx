import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import NotFoundPage from 'pages/NotFoundPage';
import RoomPage from 'pages/RoomPage';
import LoginPage from 'pages/LoginPage';
import RoomIsFullPage from 'pages/RoomIsFullPage';
import { LOGIN_ROUTE } from 'config/const/routes/website/login';
import { ROOM_ROUTE } from 'config/const/routes/website/room';
import { ROOM_IS_FULL_ROUTE } from 'config/const/routes/website/room/isFull';

function App() {
  const [name, setName] = useState<string>('');

  return (
    <Routes>
      <Route
        index
        path={LOGIN_ROUTE}
        element={<LoginPage name={name} setName={setName} />}
      />
      <Route path={ROOM_ROUTE} element={<RoomPage name={name} />} />
      <Route path={ROOM_IS_FULL_ROUTE} element={<RoomIsFullPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
