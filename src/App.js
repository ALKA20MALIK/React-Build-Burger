import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const asyncCheckout=asyncComponent(()=>{
    return import('./containers/Checkout/Checkout');
});
const asyncOrders=asyncComponent(()=>{
    return import('./containers/Orders/Orders');
});
const asyncAuth=asyncComponent(()=>{
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount () {
      this.props.onTryAutoSignup();
    }

    render () {
      return (
        <div>
            <Layout>
                    <Switch>
                        <Route path="/checkout" component={asyncCheckout} />
                        <Route path="/orders" exact component={asyncOrders} />
                        <Route path="/auth" exact component={asyncAuth} />
                        <Route path="/logout" exact component={Logout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
        </div>
    );
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
  };

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

