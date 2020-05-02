import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent'

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
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        // let routes = (
        //     <Switch>
        //         <Route path="/auth" component={Auth} />
        //         <Route path="/" exact component={BurgerBuilder} />
        //         <Redirect to="/" />
        //     </Switch>

        // )
        // if (this.props.isAuthenticated) {
        //     routes = (
        //         <Switch>
        //             <Route path="/checkout" component={Checkout} />
        //             <Route path="/orders" component={Orders} />
        //             <Route path="/logout" component={Logout} />
        //             <Route path="/" exact component={BurgerBuilder} />
        //             {this.props.buildingBurger
        //                 ? <Redirect to='/checkout' />
        //                 : <Redirect to='/' />}
        //         </Switch>
        //     )
        // }
        return (
            <div>
                <Layout>
                    {<Switch>
                        <Route path="/checkout" component={asyncCheckout} />
                        <Route path="/orders" exact component={asyncOrders} />
                        <Route path="/auth" exact component={asyncAuth} />
                        <Route path="/logout" exact component={Logout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                    }
                </Layout>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
