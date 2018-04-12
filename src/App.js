import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/Auth/PrivateRoute.jsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx';
import Business from './Components/Business/Business';
import NewBusiness from './Components/Business/NewBusiness';
import EditBusiness from './Components/Business/EditBusiness';
import Register from './Components/Auth/Register.jsx';
import Login from './Components/Auth/Login.jsx';
import NavigationBar from './common/NavigationBar.jsx';
import Landing from './Landing/Landing';

class App extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/auth/signup" component={Register} />
          <Route path="/auth/login" component={Login} />
          <Route path="/business/:id" exact component={Business} />
          <Route path="/business/:id/edit" exact component={EditBusiness} />
    			<PrivateRoute path="/businesses/new" exact component={NewBusiness} />
          <Route component={PageNotFound} />
        </Switch>
      </div>

    );
  }
}

export default App;
