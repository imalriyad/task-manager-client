import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./Layout/MainLayout";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Toaster />
        <RouterProvider router={router}>
          <MainLayout></MainLayout>
        </RouterProvider>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
