import { takeEvery } from "@redux-saga/core/effects";

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    yield console.log('Fired');
};

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
};