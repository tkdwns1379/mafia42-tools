import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import './App.css';
import Mailbox from './pages/Mailbox';
import Tier from './pages/Tier';
import Kwonyeop from './pages/Kwonyeop';
import CardTier from './pages/CardTier';
import JikpulBak from './pages/JikpulBak';

const NAV_ITEMS = [
  { path: '/', label: '우체통' },
  { path: '/tier', label: 'RP 티어' },
  { path: '/cardtier', label: '카드 강화' },
  { path: '/kwonyeop', label: '권엽' },
  { path: '/jikpulbak', label: '직플받' },
];

function Layout() {
  return (
    <div className="layout">
      <nav className="nav">
        <span className="nav-logo">마피아42 계산기</span>
        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Mailbox />} />
          <Route path="/tier" element={<Tier />} />
          <Route path="/cardtier" element={<CardTier />} />
          <Route path="/kwonyeop" element={<Kwonyeop />} />
          <Route path="/jikpulbak" element={<JikpulBak />} />
        </Routes>
      </main>
      <footer className="footer">
        마피아42 비공식 계산기 · 게임 내 수치는 업데이트에 따라 변동될 수 있습니다.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
