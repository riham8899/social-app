import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Component/Home/Home';
import { Login } from './Component/Login/Login';
import { Register } from './Component/Register/Register';
import { Layout } from './Component/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetalis from './Component/PostDetalis/PostDetalis';
import Profile from './Component/Profile/Profile';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';




function App() {

  const client = new QueryClient()


  const router = createBrowserRouter([
    { path: "", element: <Layout/>,
      children:[
        {index:true, element: <ProtectedRoute> <Home/> </ProtectedRoute>},
        {path:"profile", element: <ProtectedRoute> <Profile/> </ProtectedRoute>},
        {path:"postdetalis/:id", element: <ProtectedRoute> <PostDetalis/> </ProtectedRoute>},
        {path:"login", element: <Login/>},
        {path:"register", element:<Register/>},
        {path:"*", element:(
          <div className='h-screen   bg-danger flex  justify-content-center align-items-center'>
            <h1 className='text-7xl text-amber-500'>erorr 404 NOT FOUND BAGE</h1></div>
        )},

    ]

  }])
  return (
    <AuthContext>
      <QueryClientProvider client={client}>
    <Toaster/>
    < RouterProvider router={router} />
    </QueryClientProvider>
    </AuthContext>
  )
}

export default App