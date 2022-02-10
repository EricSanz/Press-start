/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchComponent from '../Search/Search';
import FilterComponent from '../Filter/Filter';
import { loadVideogames } from '../../redux/actions/videogameActions';
import { getUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import Card from './Card/Card';
import './VideogamesList.scss';

function VideogameList({ videogamesList, loading, error, filteredVideogameList, platformVideogames, user, cardIds, favoritesGamesID}) {

    const dispatch = useDispatch();
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user?.data;
    const localStorageUserData = userLocalStorage?.user?.data;

    const [googleUserState, setGoogleUserState] = useState(false);

    let i = -1;

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser.uid))
        }

        if(!user && userLocalStorage && googleUserState) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (user !== undefined && localStorageUserData === undefined && !googleUserState) {
            dispatch(getUser(userLocalStorage.uid));
            setGoogleUserState(!googleUserState);
        }

    }, [videogamesList?.length, filteredVideogameList?.length, platformVideogames?.length, user, localStorageUser, localStorageUserData, googleUserState, dispatch]);

    const displayVideogameList = (

        <>  
            {!platformVideogames?.length && videogamesList?.length && videogamesList.map((videogame) => (
                <Card key={videogame.id} Games={videogame} loggedUser={user} cardids={cardIds} cardIndex={i+=1} favGamesID={favoritesGamesID}/>
            ))}

            {platformVideogames?.length && platformVideogames.map((videogame) => (
                <Card key={videogame.id} Games={videogame} loggedUser={user} cardids={cardIds} cardIndex={i+=1} favGamesID={favoritesGamesID}/>
            ))}

            {!platformVideogames?.length && platformVideogames?.length === 0 && <h3 className="notExist">A videogame with that name does not exist</h3>}
        </>
    )

    return (
        <div className={loading ? "list__loading" : "list__container"} id="list__container-id">
            {loading ? null : <SearchComponent />}
            {loading ? null : <FilterComponent />}
            {error && <h3 className="noup">There has been an error loading the videogames, sorry and try again later.</h3>}
            {loading ? <Loading /> : videogamesList?.length > 0 && displayVideogameList }
        </div>
    )
}

function mapStateToProps({ videogameReducer, userReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        filteredVideogameList: videogameReducer.filteredVideogameList,
        platformVideogames: videogameReducer.platformVideogames,
        cardIds: videogameReducer.cardIds,
        user: userReducer.user,
        favoritesGamesID: userReducer.favoritesGamesID,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(VideogameList);