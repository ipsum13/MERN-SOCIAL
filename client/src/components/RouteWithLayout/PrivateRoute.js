import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layouts/Spinner';
import PropTypes from 'prop-types';

const PrivateRoute = props => {
  const { layout: Layout, component: Component, auth: { isAuthenticated, loading }, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ) : (
        <Redirect to="/signin" />
      )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth
}); 

export default connect(mapStateToProps)(PrivateRoute);
