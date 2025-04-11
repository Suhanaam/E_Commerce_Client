import { useEffect } from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from './redux/features/userSlice'; // ✅ make sure path is correct
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  // ✅ Load user from localStorage into Redux
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      dispatch(saveUser(JSON.parse(userFromStorage)));
    }
  }, [dispatch]);

  // ✅ Set theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
