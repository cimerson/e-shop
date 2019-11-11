import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5,
// }

const selecShop = state => state.shop;

export const selecCollections = createSelector(
    [selecShop],
    shop => shop.collections
)

export const selecCollection = collectionUrlParam => 
createSelector(
    [selecCollections],
    // collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    // denormalized data
    collections => collections[collectionUrlParam]
)