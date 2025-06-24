import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/login";
import DashboardPage from "./Dashboard/Dashboard";
import SalesPage from './Sales/SalesPage';
import RegisterPage from './RegisterPage/RegisterPage';
function App() {
  return (
    <Router basename="/BizTrackr">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/Sales" element={<SalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
