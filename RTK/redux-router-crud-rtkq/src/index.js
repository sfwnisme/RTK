import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./pages/RootLayout";
// import Index from './pages/Index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// rtkq
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./api/apiSlice";

const Index = lazy(() => import('./pages/Index'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const Details = lazy(() => import('./pages/Details'))
const AddPage = lazy(() => import('./pages/AddPage'))
const EditPage = lazy(() => import('./pages/EditPage'))



const appLoader = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Not Found", { statusText: "the post's ID is incurrect", status: 404 });
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement:
      <Suspense fallback="Error page is loading...">
        <ErrorPage />
      </Suspense>,
    children: [
      {
        index: true, element:
          <Suspense fallback="Main page is loading...">
            <Index />
          </Suspense>
      },
      {
        path: 'post', element:
          <Suspense fallback="Main page is loading...">
            <Index />
          </Suspense>
      },
      {
        path: 'post/add',
        element:
          <Suspense fallback="Add post page is loading...">
            <AddPage />
          </Suspense>
      },
      {
        path: 'post/:id',
        element:
          <Suspense fallback="Post details Page is loading...">
            <Details />
          </Suspense>,
        loader: appLoader
      },
      {
        path: 'post/:id/edit',
        element:
          <Suspense fallback="Edit post page is loading...">
            <EditPage />
          </Suspense>,
        loader: appLoader
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApiProvider api={apiSlice}>
    <RouterProvider router={router} />
  </ApiProvider>
);
