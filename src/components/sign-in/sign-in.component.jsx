import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

class SignIn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
        }
    }

    onSubmit = ev => {
        ev.preventDefault();

        this.setState({ email: '', password: '' });
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
                    <FormInput name="email" label="email" type="email" value={this.state.email} onChange={this.onChange} required />
                    <FormInput name="password" label="password" type="password" value={this.state.password} onChange={this.onChange} required />
                    <CustomButton type="submit">Sign In</CustomButton> 
                </form>
            </div>
        )
    }
}


export default SignIn;
