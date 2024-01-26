import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/loginPage';
import HomePage from './pages/home/homePage';
import FormateursPage from './pages/formateur/formateur';
import CalendarPage from './pages/canlendar/CalendarPage';


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
      path: "/calendar",
      element: <CalendarPage />,
    }
  ]);

  return (
   <RouterProvider router={router} />
  );
}

export default App;
