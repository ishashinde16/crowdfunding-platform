import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"; // 🔁 use react-router-dom, not "react-router"
import React, { useState, useContext, useEffect, createContext } from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Create context
export const UserContext = createContext();

// ✅ Layout component
const Layout = () => {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </ProtectedRoute>
  );
};

// ✅ Define router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/campaign",
        element: <Campaign />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// ✅ App component with context
function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    console.log("Retrieved email from localStorage:", savedEmail); // Log email
    if (savedEmail) {
      setEmail(JSON.parse(savedEmail)); // Set email if it exists in localStorage
    }
  }, []);

  // Save email to localStorage when it changes
  useEffect(() => {
    if (email) {
      console.log("Saving email to localStorage:", email); // Log email
      localStorage.setItem("email", JSON.stringify(email)); // Save email when it changes
    }
  }, [email]);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
