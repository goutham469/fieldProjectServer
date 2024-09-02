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
import GoogleOAuthVerification from './components/SignUp/GoogleOAuthVerification/GoogleOAuthVerification';
import SignUpUploadProfilePic from './components/SignUp/SignUpUploadProfilePic/SignUpUploadProfilePic';
import SetUpPassword from './components/SignUp/SetUpPassword/SetUpPassword';
import SetUpExtraDetails from './components/SignUp/SignUpExtraDetails/SignUpExtraDetails';

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

import AboutHeader from './about/AboutHeader/AboutHeader';
import AboutHurdles from './about/AboutHurdles/AboutHurdles';
import ApplicationDescription from './about/ApplicationDescription/ApplicationDescription';
import TechStack from './about/TechStack/TechStack';

import store from './store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import GamesHome from './games/GamesHome/GamesHome';
import UserDetails from './components/UserDetails/UserDetails';
import Googleac from './components/Login/Googleac';

import socket from './socket';
import SnakeGame from './games/SnakeGame/SnakeGame';
import DinoGame from './games/Dino/DinoGame';
import PacManGame from './games/PacManGame/PacManGame';
import BookMarks from './components/BookMarks/BookMarks';
import FriendRequests from './components/FriendRequests/FriendRequests';

// admin dashboard
import Master from './Admin/Master/Master';
import OnlineUsers from './Admin/OnlineUsers/OnlineUsers';


function App() {
 

  // function connect() {
  //   socket.on('connect', () => {
  //     console.log('connected to socket.io server, id = ', socket.id);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('disconnected from socket.io server');
  //   });

  //   console.log('socket connection success');
  // }

  // connect();

  window.onload = () => {
    const savedTheme = localStorage.getItem("theme") ;
    document.documentElement.setAttribute("data-theme", savedTheme);
  };

  useEffect(()=>{ 
    // connect();
    
    async function fetchServerInitially()
    {

      let base_url = process.env.REACT_APP_SERVER_BASE_URL;
      try
      {
        let responseFromServer = await fetch(`${base_url}/firstRender`)
        responseFromServer = await responseFromServer.json();

        if(responseFromServer.status == true)
        {
          document.querySelector('.MasterContent2').style.display="block";
          document.querySelector('.MasterContent1').style.display="none";
        }
      }catch(err){console.log(err,"reason : the server is not running")}
    }
    
    fetchServerInitially()
  },[])
  
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
          path:'googleAuth',
          element:<Googleac/>
        },
        {
          path:'SignUp',
          element:<SignUp/>,
          children:[
            {
              path:'',
              element:<SignUpUserName/>
            },
            {
              path:'verifyEmail',
              element:<GoogleOAuthVerification/>
            },
            {
              path:'uploadProfilePic',
              element:<SignUpUploadProfilePic/>
            },
            {
              path:'setExtraDetails',
              element:<SetUpExtraDetails/>
            },
            {
              path:'SetUpPassword',
              element:<SetUpPassword/>
            }
          ]
        },
        {
          path:'about',
          element:<AboutHeader/>,
          children:[
            {
              path:'Hurdles',
              element:<AboutHurdles/>
            },
            {
              path:'',
              element:<AboutHurdles/>
            },
            {
              path:'description',
              element:<ApplicationDescription/>
            },
            {
              path:'techstack',
              element:<TechStack/>
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
          path:'people',
          element:<AllUsers/>
        },
        {
          path:'name',
          element:<UserDetails/>
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
          element:<Notifications/>,
          children:[
            {
              path:'',
              element:<h1>Notifications</h1>
            },
            {
              path:'requests',
              element:<FriendRequests/>
            }
          ]
        },
        {
          path:'ProfileDashBoard',
          element:<ProfileDashBoard/>
        },
        {
          path:'bookmarks',
          element:<BookMarks/>
        },
        {
          path:'games',
          element:<GamesHome/>,
          children:[
            {
              path:'',
              element:<SnakeGame/>
            },
            {
              path:'snake',
              element:<SnakeGame/>
            },
            {
              path:'dino',
              element:<DinoGame/>
            },
            {
              path:'pacman',
              element:<PacManGame/>
            }
          ]
        }
      ]
    },
    {
      path:'admin',
      element:<Master/>,
      children:[
        {
          path:'',
          element:<OnlineUsers/>
        }
      ]
    },
    {
      path:'*',
      element:<h1>404 Route not found.</h1>
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
        <div className='MasterContent1'>
          <div>
            <p>Sorry, Servers are Busy at this moment.</p>
            <p>Please try again later</p>
            
          </div>
        </div>
        <div className='MasterContent2'>
          <RouterProvider router={router}/>
        </div>
      </Provider>
    </div>
  );
}

export default App;
