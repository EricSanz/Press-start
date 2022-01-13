import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePic from './ProfilePic/ProfilePic';
import UserFavorites from './UserFavorites/UserFavorites';
import UsefulInformation from './UsefulInformation/UsefulInformation';
import './Dashboard.scss';

function UserProfile({user, match, isLogged}) {
    let userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user;
    const localStorageUserData = userLocalStorage?.user?.data;

    const dispatch = useDispatch();
    let history = useHistory();

    const [googleUserState, setGoogleUserState] = useState(false);
    const [uid] = useState(match.params.userId);
    const [profilePictureOptions, setProfilePictureOptions] = useState(true);

    let toggle = false;

    const userId = user?.uid;

    useEffect(() => {

        if((!user || uid !== localStorageUserData?.uid) && localStorageUserData !== undefined) {
            dispatch(getUser(localStorageUserData?.uid));
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if(!user && userLocalStorage && googleUserState) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (localStorageUserData === undefined && !googleUserState) {
            dispatch(getUser(userLocalStorage.uid));
            setGoogleUserState(!googleUserState);
        }

    }, [user, dispatch, userLocalStorage, uid, googleUserState, localStorageUser, localStorageUserData, history, userId, isLogged]);

    // const sectionButtons = document.querySelectorAll('.section__btn');
    // const personalSectionID = document.getElementById('personalInfoSectionID');
    // const favoritesSectionID = document.getElementById('favoritesSectionID');
    // const commentsSectionID = document.getElementById('commentsSectionID');
    // const usefulInfoSectionID = document.getElementById('usefulInfoSectionID');

    // for (let i = 0; i < sectionButtons.length; i++) {
    //     sectionButtons[i]?.addEventListener('click', () => {
    //         for (let j = 0; j < sectionButtons.length; j++) {
    //             sectionButtons[j].className = 'section__btn';
    //         }
    //         sectionButtons[i].className = 'btn--active';
    //         switch (i) {
    //             case 0:
    //                 personalSectionID.className = 'section section--active';
    //                 favoritesSectionID.className = 'section section--not--active';
    //                 commentsSectionID.className = 'section section--not--active';
    //                 usefulInfoSectionID.className = 'section section--not--active';
    //                 break;
    //             // case 1:
    //             //     personalSectionID.className = 'section section--not--active';
    //             //     favoritesSectionID.className = 'section section--active';
    //             //     commentsSectionID.className = 'section section--not--active';
    //             //     usefulInfoSectionID.className = 'section section--not--active';
    //             //     break;
    //             case 2:
    //                 personalSectionID.className = 'section section--not--active';
    //                 favoritesSectionID.className = 'section section--not--active';
    //                 commentsSectionID.className = 'section section--active';
    //                 usefulInfoSectionID.className = 'section section--not--active';
    //                 break;
    //             // case 3:
    //             //     personalSectionID.className = 'section section--not--active';
    //             //     favoritesSectionID.className = 'section section--not--active';
    //             //     commentsSectionID.className = 'section section--not--active';
    //             //     usefulInfoSectionID.className = 'section section--active';
    //             //     break;
    //             default:
    //                 break;
    //         }
    //     })
    // }

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
                    <button className="section__btn btn--active">Personal Information</button>
                    <Link to={`/dashboard/${userId}/favorites`}>
                        <button className="section__btn">Favorites</button>
                    </Link>
                    <button className="section__btn">Comments</button>
                    <Link to={`/dashboard/${userId}/useful-information`}>
                        <button className="section__btn">Useful Information</button>
                    </Link>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    <div className='section section--active' id="personalInfoSectionID">
                        <p className='title'>Personal Information</p>
                    </div>
                    <div className='section section--not--active' id="favoritesSectionID">
                    </div>
                    <div className='section section--not--active' id="commentsSectionID">
                        <p className='title'>Comments Section</p>
                    </div>
                    <div className='section section--not--active' id="usefulInfoSectionID">
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
    }
}

export default connect(mapStateToProps)(UserProfile);