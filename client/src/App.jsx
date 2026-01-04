import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Expenses from "./pages/Expenses";
import Bank from "./pages/Bank";
import Cash from "./pages/Cash";
import Report from "./pages/Report";

const DashboardHome = () => <h3></h3>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <Dashboard>
              <DashboardHome />
            </Dashboard>
          }
        />
        <Route
          path="/admin/pos"
          element={
            <Dashboard>
              <POS />
            </Dashboard>
          }
        />

        <Route
          path="/admin/category"
          element={
            <Dashboard>
              <Category />
            </Dashboard>
          }
        />

        <Route
          path="/admin/product"
          element={
            <Dashboard>
              <Product />
            </Dashboard>
          }
        />

        <Route
          path="/admin/bank"
          element={
            <Dashboard>
              <Bank />
            </Dashboard>
          }
        />

        <Route
          path="/admin/cash"
          element={
            <Dashboard>
              <Cash />
            </Dashboard>
          }
        />

        <Route
          path="/admin/expenses"
          element={
            <Dashboard>
              <Expenses />
            </Dashboard>
          }
        />

        <Route
          path="/admin/report"
          element={
            <Dashboard>
              <Report />
            </Dashboard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
