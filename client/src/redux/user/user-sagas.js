import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signSucces, signFailure, signOutSucces, signOutFailure, signUpSucces, signUpFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        // console.log(userRef);
        const userSnapshot = yield userRef.get();
        yield put(signSucces({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error) {
        yield put(signFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        // const userRef = yield call(createUserProfileDocument, user);
        // // console.log(userRef);
        // const userSnapshot = yield userRef.get();
        // yield put(signSucces({ id: userSnapshot.id, ...userSnapshot.data()}))
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signFailure(error));
    }
};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        // const userRef = yield call(createUserProfileDocument, user);
        // // console.log(userRef);
        // const userSnapshot = yield userRef.get();
        // yield put(signSucces({ id: userSnapshot.id, ...userSnapshot.data()}))
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signFailure(error));
    }
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signFailure(error));
    }
};

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSucces());
    } catch (error) {
        yield put(signOutFailure(error));
    }
};

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSucces({ user, additionalData: { displayName }}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
};

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
};

export function* onSignOutStar() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
};

export function* onSignUpSucces() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
};

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignStart),
        call(isUserAuthenticated),
        call(onSignOutStar),
        call(onSignUpStart),
        call(onSignUpSucces),
    ]);
};
