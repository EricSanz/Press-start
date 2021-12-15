import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
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

    const sectionButtons = document?.querySelectorAll('.section__btn');

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

    for (let i = 0; i < sectionButtons.length; i++) {
        const sections = document.querySelectorAll('.section');
        sectionButtons[i].addEventListener('click', function(){
            for (let j = 0; j < sectionButtons.length; j++) {
                sectionButtons[j].className = 'section__btn';
                sections[j].className = 'section--not--active';
            }
            sectionButtons[i].className = 'btn--active';
            sections[i].className = 'section--active';
        })
    }

    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <div className="profile__image">
                        <img src={user?.photoURL} alt="" />
                    </div>
                    <p className="full__name">Full Name</p>
                    <p className="alias">({user?.displayName})</p>
                    
                    <button className="section__btn btn--active" id="personalInfoID" >Personal Information</button>
                    <button className="section__btn" id="favoritesID">Favorites</button>
                    <button className="section__btn" id="commentsID">Comments</button>
                    <button className="section__btn" id="usefulInfoID">Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    <div className='section section--active' id="personalInfoSectionID">
                        <p>Personal Info Section</p>
                    </div>
                    <div className='section section--not--active' id="favoritesSectionID">
                        {user?.favorites?.length > 0 && user?.favorites.map((videogame) => (
                            <p key={videogame.id}>{videogame?.game?.first_title}</p>
                        ))}
                    </div>
                    <div className='section section--not--active' id="commentsSectionID">
                        <p>Comments Section</p>
                    </div>
                    <div className='section section--not--active' id="usefulInfoSectionID">
                        <p>Useful Info Section</p>
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