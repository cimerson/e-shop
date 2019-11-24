import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// import { updateCollections } from '../../redux/shop/shop.actions';
// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
// import { selecCollectionFetching, selecCollectionIsLoaded } from '../../redux/shop/shop.selectors';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import CollectionPage from '../collection/collection.component';
import CollectionPageContainer from '../collection/colection.container';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// class ShopPage extends React.Component {
const ShopPage = ({ fetchCollectionsStart, match }) => {

    // state = {
    //     loading: true,
    // };

    // unsubscribeFromSnapshot = null;

    // componentDidMount() {

    //     const {updateCollections} = this.props;

    //     const collectionRef = firestore.collection('collections');

    //     // collectionRef.onSnapshot(async snapshot => {
        
    //     // asnyc
    //     collectionRef.get().then(snapshot => {

    //         // console.log('Shop Page Snapshot from Firestore on collections', snapshot);

    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

    //         // console.log(collectionsMap);

    //         updateCollections(collectionsMap);
    //         this.setState({loading: false});

    //     });
    // }

    // componentDidMount() {
    //     // const  { fetchCollectionsStartAsync } = this.props;
    //     // fetchCollectionsStartAsync();
    //     const  { fetchCollectionsStart } = this.props;
    //     fetchCollectionsStart();
    // }

    // hooks
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    // render() {

        // const { match, isCollectionFetching, isCollectionLoaded } = this.props;
        // const { match } = this.props;
        // const { loading } = this.state;

        // console.log('Shop Page', match);

        return (
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`} 
                    // render={(props) =>  <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} 
                    component={CollectionsOverviewContainer}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    // render={(props) =>  <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
                    component={CollectionPageContainer}
                />
            </div>
        )
    // }
};

// const mapStateToProps = createStructuredSelector({
//     isCollectionFetching: selecCollectionFetching,
//     isCollectionLoaded: selecCollectionIsLoaded,
// });

const mapDispatcToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatcToProps)(ShopPage);
