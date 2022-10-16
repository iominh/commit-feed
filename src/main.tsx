import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import IndexPage from './pages/IndexPage/IndexPage'
import RepoPage from './pages/RepoPage/RepoPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <ErrorPage />,
    // loader: async () => {

    // },
    children: [
      {
        path: ':user/:id',
        element: <RepoPage />,
        // loader: async () => {
        //   return 
        // }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
