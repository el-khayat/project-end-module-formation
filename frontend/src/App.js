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
import ExternalFormateurPage from './pages/externalFormateur/externalFormateurPublic';
import ExternalFormateurPrivatePage from './pages/externalFormateur/externalFormateurPrivate';
import FeedbackPage from './pages/feedback/feedbackPage';
import AssistantPage from './pages/assistant/assistant';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },{
      path: "/joinus",
      element: <ExternalFormateurPage />,
    },{
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
    }, {
      path: "/Enterprise",
      element: <EnterprisePage />,
    }
    ,{
      path: "/assistant",
      element: <AssistantPage />,
    },{
      path: "/formateurs/external",
      element: <ExternalFormateurPrivatePage />,
    },
    {
      path: "/formations",
      element: <FormationsPage />,
    },
    {
      path: "/feedback",
      element: <FeedbackPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
