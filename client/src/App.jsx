import React from 'react';
import './app.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

// pages and components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import Error from "./pages/error/Error";
import Test from "./pages/test/Test";

// react query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { getCurrentUser } from './utils/getCurrentUser';

const App = () => {
  const currentUser = getCurrentUser()?._id;
  const queryClient = new QueryClient();

  console.log('current user id: ', currentUser);

  const Layout = () => {
    return (
      <div className='app'>
        <QueryClientProvider client={queryClient} >
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
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
          path: "/gigs",
          element: currentUser ? <Gigs /> : <Navigate to="/" replace />,
        },
        {
          path: "/myGigs",
          element: currentUser ? <MyGigs /> : <Navigate to="/" replace />,
        },
        {
          path: "/orders",
          element: currentUser ? <Orders /> : <Navigate to="/" replace />,
        },
        {
          path: "/messages",
          element: currentUser ? <Messages /> : <Navigate to="/" replace />,
        },
        {
          path: "/message/:id",
          element: currentUser ? <Message /> : <Navigate to="/" replace />,
        },
        {
          path: "/add",
          element: currentUser ? <Add /> : <Navigate to="/" replace />,
        },
        {
          path: "/gig/:id",
          element: currentUser ? <Gig /> : <Navigate to="/" replace />,
        },
        {
          path: "/pay/:gigId",
          element: currentUser ? <Pay /> : <Navigate to="/" replace />,
        },
        {
          path: "/success",
          element: currentUser ? <Success /> : <Navigate to="/" replace />,
        },
      ],
    },
    {
      path: "/register",
      element: currentUser ? <Navigate to="/" replace /> : <Register />
    },
    {
      path: "/login",
      element: currentUser ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/test",
      element: <Test />
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />

}

export default App;