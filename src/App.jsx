import { useState,useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export const App = () => {

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Apply the selected theme to the root html tag
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (<>
  
  <RouterProvider router={router} />
  <Toaster />
  </>
    
  )
}

export default App
