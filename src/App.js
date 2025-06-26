import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/login";
import DashboardPage from "./Dashboard/Dashboard";
import SalesPage from './Sales/SalesPage';
import RegisterPage from './RegisterPage/RegisterPage';
import SalesList from './Sales/Saleslist';
import SalesPage1 from './Sales/SalesPage1';

function App() {
  return (
    <Router basename="/BizTrackr">
      <Routes>
        <Route path="/" element={<SalesPage1 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/Sales" element={<SalesList />} />
        <Route path="/Sales/create" element={<SalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
