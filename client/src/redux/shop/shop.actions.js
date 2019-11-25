import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFaliure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});


export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        // collectionRef.onSnapshot(async snapshot => {
        
        // asnyc
        collectionRef.get().then(snapshot => {

            // console.log('Shop Page Snapshot from Firestore on collections', snapshot);

            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

            // console.log(collectionsMap);

            // updateCollections(collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));

            // this.setState({loading: false});

        }).catch(error => dispatch(fetchCollectionsFaliure(error.message)));
    }
}

