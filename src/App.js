import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPost from './components/NewPost/NewPost';
import SinglePost from './components/SinglePost/SinglePost';
import AllPosts from './components/AllPosts/AllPosts';

function App() {
  // console.log(process.env)
  // console.log(process.env.REACT_APP_SERVER_BASE_URL)
  return (
    <div className="App">
      <h3 className='text-success'>Social media platform</h3>
      <NewPost/>
      <AllPosts/>
    </div>
  );
}

export default App;
