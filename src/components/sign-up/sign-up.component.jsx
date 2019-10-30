import React, { Component } from 'react'

import FrormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends Component {

    constructor() {
        super()
    
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    onSubmit = async ev => {
        ev.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("password don`t match");
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });


        } catch (error) {
            console.error(error);
        }

    }

    onChange = ev =>{
        const { name, value } = ev.target;

        this.setState({[name]: value});
    }
    
    render() {

        const { displayName, email, password, confirmPassword } = this.state

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.onSubmit}>

                    <FrormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.onChange}
                        label='Display Name'
                        required
                    />

                    <FrormInput
                        type='text'
                        name='email'
                        autoComplete="username"
                        value={email}
                        onChange={this.onChange}
                        label='email'
                        required
                    />

                    <FrormInput
                        type='password'
                        autoComplete="new-password"
                        name='password'
                        value={password}
                        onChange={this.onChange}
                        label='Pasword'
                        required
                    />

                    <FrormInput
                        type='password'
                        autoComplete="re-new-password"
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.onChange}
                        label='Confirm Pasword'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </div>
        )
    }
}

export default SignUp;
