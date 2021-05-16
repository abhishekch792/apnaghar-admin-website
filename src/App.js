import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import { getAllCategory, isUserLoggedIn, getInitialData } from './actions';
import { authConstants } from './actions/constants';
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import Category from './containers/Category';
import Home from './containers/Home';
import Orders from './containers/Orders';
import Products from './containers/Products';
import Signin from './containers/Signin';
import Signup from './containers/Signup';


function App() {

const dispatch = useDispatch();
const auth = useSelector(state => state.auth);

useEffect(() => {
  if(!auth.authenticate){
    dispatch(isUserLoggedIn());
  }
  if(auth.authenticate){
    dispatch(getInitialData());
  }
},[auth.authenticate]);
  

  return (
    <div className="App">
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/category" component={Category} />
            <PrivateRoute path="/products"  component={Products} />
            <PrivateRoute path="/orders" component={ Orders }/> 
            
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </Switch>
        
    </div>
  );
}

export default App


//navbar colour:#15EE4C

//bg:  background-image: linear-gradient(to right top, #21dccc, #00e4b9, #00eb9b, #00ef71, #3bf233);