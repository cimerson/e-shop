import { takeLatest, all, call, put } from "@redux-saga/core/effects";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFaliure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    // yield console.log('Fired');

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFaliure(error.message));
    }

        // from thunk

        // collectionRef
        //     .get()
        //     .then(snapshot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //         dispatch(fetchCollectionsSuccess(collectionsMap));
        //     })
        //     .catch(error => dispatch(fetchCollectionsFaliure(error.message)));
};

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
};

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
};
