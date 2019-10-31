import React, { Component }from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigInUp from './pages/sigin-in-up/sigin-in-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';


class App extends Component {

    // local state app
    // constructor() {
    //     super()
    
    //     this.state = {
    //          currentUser: null
    //     }
    // }

    unsubscribeFromAuth = null;

    componentDidMount(){

        const {setCurrentUser} = this.props

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    // console.log(snapShot.data());

                    // local action app
                    // this.setState({ 
                    //     currentUser: {
                    //         id: snapShot.id,
                    //         ...snapShot.data(),
                    //     }
                    // }, 
                    //     // () => {
                    //     //     console.log('USER', this.state);
                    //     // }
                    // );

                    //redux action
                    setCurrentUser({
                        id: snapShot.id,
                       ...snapShot.data(),
                    });

                    // console.log('Current User', this.state);

                });
            }
            
            setCurrentUser(userAuth);
        })
    }

    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }
    

    render(){
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SigInUp />)} />
                </Switch>
            </div>
        );
    }
    
};

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
 