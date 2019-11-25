// import React, { Component } from 'react'
import React, { useState } from 'react'
import { connect } from 'react-redux';

import FrormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

// class SignUp extends Component {

//     constructor() {
//         super()
    
//         this.state = {
//             displayName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//         }
//     }

const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentioals] = useState({displayName: '', email: '', password: '', confirmPassword: ''});

    const { displayName, email, password, confirmPassword } = userCredentials;

    const onSubmit = async ev => {
        ev.preventDefault();

        // const { signUpStart } = this.props;
        // const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("password don`t match");
            return;
        }

        // thunk
        // try {

        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);

        //     await createUserProfileDocument(user, {displayName});

        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: '',
        //     });


        // } catch (error) {
        //     console.error(error);
        // }

        //sagas
        signUpStart({ displayName, email, password })

    }

    const onChange = ev =>{
        const { name, value } = ev.target;

        // this.setState({[name]: value});
        setUserCredentioals({ ...userCredentials, [name]: value});
    }
    
    // render() {

        // const { displayName, email, password, confirmPassword } = this.state

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                {/* <form className='sign-up-form' onSubmit={this.onSubmit}> */}
                <form className='sign-up-form' onSubmit={onSubmit}>

                    <FrormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        // onChange={this.onChange}
                        onChange={onChange}
                        label='Display Name'
                        required
                    />

                    <FrormInput
                        type='text'
                        name='email'
                        autoComplete="username"
                        value={email}
                        // onChange={this.onChange}
                        onChange={onChange}
                        label='email'
                        required
                    />

                    <FrormInput
                        type='password'
                        autoComplete="new-password"
                        name='password'
                        value={password}
                        // onChange={this.onChange}
                        onChange={onChange}
                        label='Pasword'
                        required
                    />

                    <FrormInput
                        type='password'
                        autoComplete="re-new-password"
                        name='confirmPassword'
                        value={confirmPassword}
                        // onChange={this.onChange}
                        onChange={onChange}
                        label='Confirm Pasword'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </div>
        )
    // }
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
})

export default connect(null, mapDispatchToProps)(SignUp);
