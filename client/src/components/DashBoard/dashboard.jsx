import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserFavorites from './UserFavorites/UserFavorites';
import UsefulInformation from './UsefulInformation/UsefulInformation';
import './Dashboard.scss';

function UserProfile({user, match, isLogged}) {
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user;
    const localStorageUserData = userLocalStorage?.user?.data;

    const dispatch = useDispatch();
    let history = useHistory();

    const [googleUserState, setGoogleUserState] = useState(false);
    const [uid] = useState(match.params.userId);

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

    const sectionButtons = document.querySelectorAll('.section__btn');
    const personalSectionID = document.getElementById('personalInfoSectionID');
    const favoritesSectionID = document.getElementById('favoritesSectionID');
    const commentsSectionID = document.getElementById('commentsSectionID');
    const usefulInfoSectionID = document.getElementById('usefulInfoSectionID');

    for (let i = 0; i < sectionButtons.length; i++) {
        sectionButtons[i]?.addEventListener('click', () => {
            for (let j = 0; j < sectionButtons.length; j++) {
                sectionButtons[j].className = 'section__btn';
            }
            sectionButtons[i].className = 'btn--active';
            switch (i) {
                case 0:
                    personalSectionID.className = 'section section--active';
                    favoritesSectionID.className = 'section section--not--active';
                    commentsSectionID.className = 'section section--not--active';
                    usefulInfoSectionID.className = 'section section--not--active';
                    break;
                case 1:
                    personalSectionID.className = 'section section--not--active';
                    favoritesSectionID.className = 'section section--active';
                    commentsSectionID.className = 'section section--not--active';
                    usefulInfoSectionID.className = 'section section--not--active';
                    break;
                case 2:
                    personalSectionID.className = 'section section--not--active';
                    favoritesSectionID.className = 'section section--not--active';
                    commentsSectionID.className = 'section section--active';
                    usefulInfoSectionID.className = 'section section--not--active';
                    break;
                case 3:
                    personalSectionID.className = 'section section--not--active';
                    favoritesSectionID.className = 'section section--not--active';
                    commentsSectionID.className = 'section section--not--active';
                    usefulInfoSectionID.className = 'section section--active';
                    break;
                default:
                    break;
            }
        })
    }

    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <img src={user?.photoURL} alt="" />
                    <p className="full__name">Welcome &nbsp;<span className="alias">{user?.displayName}!</span></p>
                    <button className="section__btn btn--active" id="0" >Personal Information</button>
                    <button className="section__btn" id="1">Favorites</button>
                    <button className="section__btn" id="2">Comments</button>
                    <button className="section__btn" id="3">Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    <div className='section section--active' id="personalInfoSectionID">
                        <p className='title'>Personal Information</p>
                    </div>
                    <div className='section section--not--active' id="favoritesSectionID">
                        <h1 className='title'>My favorites<FontAwesomeIcon className='heart__count' icon="heart"/><span className={ user?.favorites?.length >= 10 ? 'favorites__count--2' : 'favorites__count'}>{user?.favorites?.length}</span></h1>
                        <div className='user__favorites--container'>
                            {user?.favorites?.length > 0 && user?.favorites.map((favorites) => (
                                <UserFavorites favorites={favorites}/>
                            ))}
                        </div>
                    </div>
                    <div className='section section--not--active' id="commentsSectionID">
                        <p className='title'>Comments Section</p>
                    </div>
                    <div className='section section--not--active' id="usefulInfoSectionID">
                        <UsefulInformation />
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