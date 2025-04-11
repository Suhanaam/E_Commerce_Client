import { useState, useEffect } from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { saveUser } from './redux/userSlice'; // ✅ make sure this path is correct

export const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  // ✅ Restore user from localStorage into Redux on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(saveUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // ✅ Apply selected theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
