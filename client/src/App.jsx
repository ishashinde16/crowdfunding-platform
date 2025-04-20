import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import React, { useState, useContext, useEffect, createContext } from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Contribute from "./pages/Contribute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import ProtectedRoute from "./components/ProtectedRoute";

export const UserContext = createContext();

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
        path: "/Contribute/:campaignId", // Add route for contribute page
        element: <Contribute />, // Component for the contribute page
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
  }
]);

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    console.log("Retrieved email from localStorage:", savedEmail);
    if (savedEmail) {
      setEmail(JSON.parse(savedEmail));
    }
  }, []);

  useEffect(() => {
    if (email) {
      console.log("Saving email to localStorage:", email);
      localStorage.setItem("email", JSON.stringify(email));
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
