import React, { Component }from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigInUp from './pages/sigin-in-up/sigin-in-up.component';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends Component {

    constructor() {
        super()
    
        this.state = {
             currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount(){
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user}); 

            console.log('USER', this.state.currentUser);
        })
    }

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }
    

    render(){
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={SigInUp} />
                </Switch>
            </div>
        );
    }
    
}

export default App;
 