import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MenuBar from './components/menu-bar/MenuBar';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';

import AuthRoute from './util/AuthRoute';
import Footer from './components/footer/Footer';

import SinglePost from './pages/single-post/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/posts/:id" component={SinglePost}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
