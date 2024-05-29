import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NewPost from './components/NewPost/NewPost';
import AllPosts from './components/AllPosts/AllPosts';
import AllUsers from './components/AllUsers/AllUsers';
import AppHeader from './components/AppHeader/AppHeader';

import LandingPage from './components/LandingPage/LandingPage';
import Description from './components/LandingPage/Description/Description';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SignUpUserName from './components/SignUp/SignUpUserName/SignUpUserName';

import MasterDashboard from './components/User/MasterDasboard/MasterDashboard';

function App() {
  console.log(process.env)
  console.log(process.env.REACT_APP_SERVER_BASE_URL)
  const router = createBrowserRouter([
    {
      path:'',
      element:<LandingPage/>,
      children:[
        {
          path:'',
          element:<Description/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'SignUp',
          element:<SignUp/>,
          children:[
            {
              path:'',
              element:<SignUpUserName/>
            }
          ]
        }
      ]
    },
    {
      path:'user',
      element:<MasterDashboard/>,
      children:[
        {
          path:'',
          element:<AllPosts/>
        },
        {
          path:'home',
          element:<AllPosts/>
        },
        {
          path:'people',
          element:<AllUsers/>
        },
        {
          path:'newpost',
          element:<NewPost/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
