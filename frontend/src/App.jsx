import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./context/ProtectRoute";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
import Stock from "./pages/admin/Stock";
import StockIn from "./pages/admin/StockIn";
import Stockout from "./pages/admin/StockOut";
import Report from "./pages/admin/Report";
import Profile from "./pages/admin/Profile";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stockin"
          element={
            <ProtectedRoute>
              <StockIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stockout"
          element={
            <ProtectedRoute>
              <Stockout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}
