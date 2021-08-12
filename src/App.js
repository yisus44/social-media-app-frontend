import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Container } from 'semantic-ui-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MenuBar from './components/menu-bar/MenuBar';
import { AuthProvider } from './context/auth';
import UpdateFormPost from './pages/update-post-form/UpdatePostForm';
import AuthRoute from './util/AuthRoute';
import Footer from './components/footer/Footer';
import MostPopular from './pages/most-popular/MostPopular';

import SinglePost from './pages/single-post/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/posts/:id" component={SinglePost}></Route>
          <Route exact path="/popular" component={MostPopular}></Route>
          <Route
            exact
            path="/posts/edit/:id"
            component={UpdateFormPost}
          ></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
