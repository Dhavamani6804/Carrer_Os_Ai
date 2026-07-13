import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ResumePage from "../pages/resume/ResumePage";
import AIMentorPage from "../pages/ai/AIMentorPage";
import JobsPage from "../pages/jobs/JobsPage";
import CareerHubPage from "../pages/careerHub/CareerHubPage";
import AddApplicationPage from "../pages/careerHub/AddApplicationPage";
import ApplicationDetailsPage from "../pages/careerHub/ApplicationDetailsPage";
import PreparationPage from "../pages/preparation/PreparationPage";

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

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <ResumePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor"
        element={
          <ProtectedRoute>
            <AIMentorPage />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/career-hub"
        element={
          <ProtectedRoute>
            <CareerHubPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/career-hub/applications/:applicationId"
        element={
          <ProtectedRoute>
            <ApplicationDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/career-hub/new" element={
        <ProtectedRoute>
        <AddApplicationPage />
        </ProtectedRoute>
        } />

      <Route
        path="/preparation/:applicationId"
        element={
          <ProtectedRoute>
            <PreparationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
