import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from '../components';
//import PrivateRoute from './PrivateRoute'
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
  Dashboard as DashboardView,
  SignIn as SignInView,
  SignUp as SignUpView,
  Profile as ProfileView,
  EditProfile as EditProfileView,
  Post as PostView
} from '../views';

import PostList from '../views/Dashboard/components/PostList';
// import PostCard from '../views/Dashboard/components/PostCard'


const Routes = props => {
  return (
    <div>
    <Switch>
      <Redirect
        exact
        from="/"
        to="/signin"
      />
      
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <PrivateRoute
        component={PostList}
        exact
        layout={MinimalLayout}
        path="/posts"
      />

      <PrivateRoute
        component = {ProfileView}
        exact
        layout={MinimalLayout}
        path="/profile/:id"
      />

      <PrivateRoute
        component = {PostView}
        exact
        layout={MainLayout}
        path='/posts/:id'
      />
      
      <PrivateRoute
        component={EditProfileView}
        exact
        layout={MinimalLayout}
        path="/profile/edit/:id"
      />
      <PublicRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/signin"
      />
      <PublicRoute
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/signup"
      />
    
      {/* <Redirect to="/not-found" />  */}
    </Switch>
    </div>
  );
};

export default Routes;