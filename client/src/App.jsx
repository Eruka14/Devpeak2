import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Profile from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return element;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />,
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<HomePage />} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/addquestion",
      element: <ProtectedRoute element={<AddQuestionPage />} />,
    },
    {
      path: "/editquestion",
      element: <ProtectedRoute element={<EditQuestionPage />} />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/profile/:id",
      element: <ProtectedRoute element={<Profile />} />,
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<AdminPage />} />,
    },
  ]);

  return (
    <>
      {" "}
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
