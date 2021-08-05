import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';

import AuthRoute from './util/AuthRoute';

import SinglePost from './pages/SinglePost';

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
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
