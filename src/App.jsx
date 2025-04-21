import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Router';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from './redux/features/userSlice'; // ✅ make sure path is correct
import { Toaster } from 'react-hot-toast';




export const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const [isReady, setIsReady] = useState(false);

  // ✅ Load user and mark app as ready
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      dispatch(saveUser(JSON.parse(userFromStorage)));
    }
    setIsReady(true);
  }, [dispatch]);

  // ✅ Set theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ✅ Show loading UI until app is ready
  if (!isReady) return <p>Loading...</p>;

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <ToastContainer />

    </>
  );
};

export default App;
