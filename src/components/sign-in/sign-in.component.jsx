// import React, { Component } from 'react';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { googleSignStart, emailSignStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

// class SignIn extends Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
//             email: '',
//             password: '',
//         };
//     }
const SignIn = ({ emailSignStart, googleSignStart }) => {

    const [ userCredentials, setUserCredentials ] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;

    const onSubmit = async ev => {
        ev.preventDefault();

        // const { email, password } = this.state;

        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({ email: '', password: '' });
        // } catch (error){
        //     console.error(error);
        // };

        //sagas
        // const { emailSignStart } = this.props;

        emailSignStart(email, password);
        
    };

    const onChange = ev => {
        const { value, name } = ev.target;

        // this.setState({ [name]: value})
        setUserCredentials({...userCredentials, [name]: value})
    };
    
    // render() {

        // const { googleSignStart } = this.props;

        return (
            <div className="sigin-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                {/* <form onSubmit={this.onSubmit}> */}
                <form onSubmit={onSubmit}>

                    <FormInput 
                        name="email"
                        label="email"
                        type="email"
                        autoComplete="username"
                        // value={this.state.email}
                        value={email}
                        // onChange={this.onChange}
                        onChange={onChange}
                        required 
                    />

                    <FormInput 
                        name="password" 
                        label="password" 
                        type="password" 
                        autoComplete="current-password" 
                        // value={this.state.password} 
                        value={password} 
                        // onChange={this.onChange} 
                        onChange={onChange} 
                        required 
                    />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton> 
                        {/* <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton> */}
                        <CustomButton type='button' onClick={googleSignStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    // }
};

const mapDispatchToProps = dispatch => ({
    googleSignStart: () => dispatch(googleSignStart()),
    emailSignStart: (email, password) => dispatch(emailSignStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
