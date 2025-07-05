import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/login";
import DashboardPage from "./Dashboard/Dashboard";
import SalesPage from './Sales/SalesPage';
import RegisterPage from './RegisterPage/RegisterPage';
import SalesList from './Sales/Saleslist';
import ExpensePage from './Expense/Expense';

function App() {
  return (
    <Router basename="/BizTrackr">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/Sales" element={<SalesList />} />
        <Route path="/Sales/create" element={<SalesPage />} />
        <Route path='/expense' element={<ExpensePage />} />
      </Routes>
    </Router>
  );
}

export default App;
