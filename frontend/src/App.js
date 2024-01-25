import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/loginPage';
import HomePage from './pages/home/homePage';
import FormateursPage from './pages/formateur/formateur';
import FormationsPage from './pages/formation/formation';


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
    {
      path: "/formateurs",
      element: <FormateursPage />,
    },
    {
      path: "/formations",
      element: <FormationsPage />,
    }
  ]);

  return (
   <RouterProvider router={router} />
  );
}

export default App;
