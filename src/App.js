import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';


import AppHeader from './components/AppHeader/AppHeader';

import LandingPage from './components/LandingPage/LandingPage';
import Description from './components/LandingPage/Description/Description';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SignUpUserName from './components/SignUp/SignUpUserName/SignUpUserName';

import NewPost from './components/NewPost/NewPost';
import AllPosts from './components/AllPosts/AllPosts';
import AllUsers from './components/AllUsers/AllUsers';

import MasterDashboard from './components/User/MasterDasboard/MasterDashboard';

import ChatMainDashboard from './chatComponents/ChatMainDashboard/ChatMainDashboard';
import ChatAllUsers from './chatComponents/ChatAllUsers/ChatAllUsers';
import UserChat from './chatComponents/UserChat/UserChat';

import Notifications from './notifications/Notifications/Notifications';
import PostFeed from './notifications/PostFeed/PostFeed';

import ProfileDashBoard from './Profile/ProfileDashBoard/ProfileDashBoard';

import store from './store';
import { Provider } from 'react-redux';


function App() {

  // console.log(store,store.getState())
  
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
        },
        {
          path:'chat',
          element:<ChatMainDashboard/>,
          children:[
            {
              path:'',
              element:<ChatAllUsers/>
            },
            {
              path:'ChatOf',
              element:<UserChat/>
            }
          ]
        },
        {
          path:'Notifications',
          element:<Notifications/>
        },
        {
          path:'ProfileDashBoard',
          element:<ProfileDashBoard/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Facebook</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </div>
  );
}

export default App;
