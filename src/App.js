import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sing-in-and-sign-up/sing-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import  { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
  //Adding stored users in firebase to App State
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
           { 
           //signed in user cannot access the signin route
          }
          <Route exact path='/signin' render={() => currentUser? (<Redirect to ='/'/>): (<SignInAndSignUpPage/>)}/>
          <Route exact path= '/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps) (App);
