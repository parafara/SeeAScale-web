import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home';
import LogIn from '@components/LogIn';
import LogOut from '@components/LogOut';
import Preregister from '@components/Preregister';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '/logout',
        element: <LogOut />
      },
      {
        path: '/preregister',
        element: <Preregister />
      }
    ]
  }
]);

export default router;
