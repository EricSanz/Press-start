import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/actions/userActions';
import CardFavorite from './CardFavorites/CardFavorites';
import ProfilePic from '../ProfilePic/ProfilePic';
import './UserFavorites.scss';

function UserFavorites({ favoritesGamesID, user, match}) {

    let userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user;
    const localStorageUserData = userLocalStorage?.user?.data;

    const dispatch = useDispatch();
    
    let googleUser = false;
    let emailUser = false;
    let numberOfFavorites = user?.favorites?.length;
    let toggle = false;

    const [googleUserState, setGoogleUserState] = useState(false);
    const [uid] = useState(match.params.userId);
    const [favoritesUpdated, setFavoritesUpdated] = useState(false);
    const [profilePictureOptions, setProfilePictureOptions] = useState(true);

    const userId = user?.uid;

    useEffect(() => {

        if((!user || uid !== localStorageUserData?.uid) && localStorageUserData !== undefined) {
            dispatch(getUser(localStorageUserData?.uid));
        }
        if((!user || uid !== localStorageUser?.uid) && localStorageUser !== undefined) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser?.uid));
        }
        
        if(!user && userLocalStorage && googleUserState) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (localStorageUser === undefined && !googleUserState) {
            dispatch(getUser(user?.uid));
            setGoogleUserState(!googleUserState);
        }

        if (numberOfFavorites !== user?.favorites?.length) {
            dispatch(getUser(user.uid));
            localStorage.user = JSON.stringify({ user: user });
            setGoogleUserState(!googleUserState);
        }

    }, [user, user?.favorites?.length, numberOfFavorites, localStorageUserData, localStorageUser, setFavoritesUpdated, favoritesUpdated, dispatch, favoritesGamesID?.length, userLocalStorage, uid, googleUserState, userId, googleUser, emailUser]);

    const changeProfilePic = document.getElementById('change__profile__pic--id');
    const profilePicOptions = document.getElementById('prodile__pic__options--id');

    changeProfilePic?.addEventListener('click', () => {
        setProfilePictureOptions(!profilePictureOptions);
        toggle = !toggle;
        profilePictureOptions ? profilePicOptions.style.display = 'block' : profilePicOptions.style.display = 'none';
    })

    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <img src={localStorageUserData?.photoURL} alt=""/>
                    <FontAwesomeIcon icon="exchange-alt" id="change__profile__pic--id" className='change__profile__pic'/>
                    <div className='profile__pic--container' id='prodile__pic__options--id'>
                        <ProfilePic profilePicOptions={profilePicOptions} profilePictureOptions={profilePictureOptions} setProfilePictureOptions={setProfilePictureOptions} user={user} dispatch={dispatch} />
                    </div>
                    <p className="full__name">Welcome &nbsp;<span className="alias">{localStorageUserData?.displayName}!</span></p>
                    <Link to={`/dashboard/${userId}`}>
                    <button className="section__btn" id="0" >Personal Information</button>
                    </Link>
                    <button className="section__btn btn--active" id="1">Favorites</button>
                    <Link to={`/dashboard/${userId}`}>
                    <button className="section__btn" id="2">Comments</button>
                    </Link>
                    <a href={`/dashboard/${userId}/useful-information`}>
                        <button className="section__btn" id="3">Useful Information</button>
                    </a>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                        <div className='section' id="favoritesSectionID">
                            <div className='title__container'>
                                <h1 className='title'>My favorites</h1>
                                <div className='heart__container'>
                                    <FontAwesomeIcon className='heart__count' icon="heart"/>
                                    <p className='favorites__count'>{user?.favorites?.length}</p>
                                </div>
                            </div>
                            <div className='user__favorites--container'>
                                {user?.favorites?.length > 0 && user?.favorites.map((favorites) => (
                                    <CardFavorite key={favorites.id} favoritesCard={favorites} loggedUser={user}/>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user,
        isLogged: userReducer.isLogged,
        favoritesGamesID: userReducer.favoritesGamesID,
    }
}

export default connect(mapStateToProps)(UserFavorites);