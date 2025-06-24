import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/login";
import DashboardPage from "./Dashboard/Dashboard";
import SalesPage from './Sales/SalesPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/Sales" element={<SalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
