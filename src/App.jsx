/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import LoginPage from "./Components/LoginPage";
import MainBody from "./Components/MainBody";
import ErrorPage from "./Components/ErrorPage"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  return user ? children : <Navigate to="/" />;
}

function App() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (checkingAuth) return <div>Loading...</div>;

  const appRouter = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    {
      path: "/main",
      element: (
        <ProtectedRoute>
          <MainBody />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
