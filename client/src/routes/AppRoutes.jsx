import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ResumePage from "../pages/resume/ResumePage";
import AIMentorPage from "../pages/ai/AIMentorPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="/resume" element={
        <ProtectedRoute>
          <ResumePage />
        </ProtectedRoute>
        } />

      <Route
        path="/mentor"
        element={
          <ProtectedRoute>
            <AIMentorPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
