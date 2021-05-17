import { createSelector } from 'reselect';

const selectShop = state =>  state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//Converting object into array by geeting object key and adding data to the keys
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) :
    []
    );

//Fetching the objects according to the url parameter passed from component
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections], 
        collections => (collections ? collections[collectionUrlParam] : null)
        );