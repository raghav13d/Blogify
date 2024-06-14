import './App.css'
import Post from './components/Post';
import Header from './components/Header';
import Layout from './components/Layout';
import {Routes,Route} from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
import {UserContextProvider} from './userContext';
function App() {

  return (
    <UserContextProvider>
      <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={
                  <IndexPage />
              } />
              <Route path='/login' element={
                  <LoginPage />
              } /> 
              <Route path='/register' element={
                  <RegisterPage />
              } /> 
              <Route path= '/create' element={<CreatePost />
              }/>
              <Route path='/post/:id' element={<PostPage />
              } />
              <Route path='/edit/:id' element={<EditPost/>
              } />
            </Route>
              
              
          </Routes>
    </UserContextProvider>
    
       

         
      
    
    
  );
};

export default App
