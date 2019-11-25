// import React, { Component }from 'react';
import React, { useEffect }from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigInUp from './pages/sigin-in-up/sigin-in-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// import { selecCollectionsForPreview } from './redux/shop/shop.selectors'
import { checkUserSession } from './redux/user/user.actions';

import './App.css';


// class App extends Component {

const App = ({ checkUserSession, currentUser }) => {

    // local state app
    // constructor() {
    //     super()
    
    //     this.state = {
    //          currentUser: null
    //     }
    // }

    // unsubscribeFromAuth = null;

    // componentDidMount(){

    //     // const {setCurrentUser} = this.props
    //     // const {setCurrentUser, collectionsArray} = this.props


    //     // thunk
    //     // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            
    //     //     if(userAuth) {
    //     //         const userRef = await createUserProfileDocument(userAuth);

    //     //         userRef.onSnapshot(snapShot => {
    //     //             // console.log(snapShot.data());

    //     //             // local action app
    //     //             // this.setState({ 
    //     //             //     currentUser: {
    //     //             //         id: snapShot.id,
    //     //             //         ...snapShot.data(),
    //     //             //     }
    //     //             // }, 
    //     //             //     // () => {
    //     //             //     //     console.log('USER', this.state);
    //     //             //     // }
    //     //             // );

    //     //             //redux action
    //     //             setCurrentUser({
    //     //                 id: snapShot.id,
    //     //                ...snapShot.data(),
    //     //             });

    //     //             // console.log('Current User', this.state);

    //     //         });
    //     //     }
            
    //     //     setCurrentUser(userAuth);
    //     //     // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
    //     // })

    //     // saga
    //     const { checkUserSession } = this.props;
    //     checkUserSession();
    // }

    // hooks
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    // componentWillUnmount(){
    //     this.unsubscribeFromAuth();
    // }
    

    // render(){
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    {/* <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SigInUp />)} /> */}
                    <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SigInUp />)} />
                </Switch>
            </div>
        );
    // }
    
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    // collectionsArray: selecCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({
    // setCurrentUser: user => dispatch(setCurrentUser(user))
    checkUserSession: () => dispatch(checkUserSession()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
 