import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    onSubmit = async ev => {
        ev.preventDefault();

        const { email, password } =this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error){
            console.error(error);
        };
        
    }

    onChange = ev => {
        const { value, name } = ev.target;

        this.setState({ [name]: value})
    }
    
    render() {
        return (
            <div className="sigin-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.onSubmit}>

                    <FormInput 
                        name="email"
                        label="email"
                        type="email"
                        autoComplete="username"
                        value={this.state.email}
                        onChange={this.onChange}
                        required 
                    />

                    <FormInput 
                        name="password" 
                        label="password" 
                        type="password" 
                        autoComplete="current-password" 
                        value={this.state.password} 
                        onChange={this.onChange} 
                        required 
                    />

                    <div className='buttons'>
                        <CustomButton type="submit">Sign In</CustomButton> 
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}


export default SignIn;
