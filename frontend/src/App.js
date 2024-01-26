import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/loginPage';
import HomePage from './pages/home/homePage';
import FormateursPage from './pages/formateur/formateur';
import CalendarPage from './pages/canlendar/CalendarPage';
import EnterprisePage from './pages/entreprise/entreprise';
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
<<<<<<< HEAD
    },
    {
      path: "/calendar",
      element: <CalendarPage />,
=======
    }, {
      path: "/Enterprise",
      element: <EnterprisePage />,
    },
    {
      path: "/formations",
      element: <FormationsPage />,
>>>>>>> main
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
