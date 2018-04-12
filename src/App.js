import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/Auth/PrivateRoute';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Business from './Components/Business/Business';
import NewBusiness from './Components/Business/NewBusiness';
import EditBusiness from './Components/Business/EditBusiness';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import NavigationBar from './common/NavigationBar';
import Landing from './Landing/Landing';
import ForgotPassword from './Components/Auth/ForgotPassword';

class App extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/auth/signup" component={Register} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
    			<PrivateRoute path="/auth/reset-password" exact component={NewBusiness} />
          <Route path="/business/:id" exact component={Business} />
          <PrivateRoute path="/business/:id/edit" exact component={EditBusiness} />
    			<PrivateRoute path="/businesses/new" exact component={NewBusiness} />
          <Route component={PageNotFound} />
        </Switch>
      </div>

    );
  }
}

export default App;
