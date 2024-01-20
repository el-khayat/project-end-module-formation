import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/loginPage';
import HomePage from './pages/home/homePage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
   <RouterProvider router={router} />
  );
}

export default App;
