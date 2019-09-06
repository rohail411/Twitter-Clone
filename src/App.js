import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Navbar from './components/Navbar';

import {Provider} from 'react-redux';
import store from './store/store';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

import 'antd/dist/antd.css';
import MuiTheme from './utils/theme';

import axios from 'axios';
import {logoutUser,getUserData} from './store/actions/userAction';
import jwtDecode from 'jwt-decode';
import AuthRoute from './utils/AuthRoute';
import { SET_AUTHENTICATED } from './store/types';

const theme = createMuiTheme(MuiTheme);

const token = localStorage.FBIdToken;
axios.defaults.baseURL = "https://asia-east2-socialapp-d8c8c.cloudfunctions.net/api";

if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000< Date.now() ){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    store.dispatch({type:SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <Router>
          <Navbar/>
            <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/scream/:screamId" component={user} />
              
            </Switch>
            </div>
        </Router>
      </Provider>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
