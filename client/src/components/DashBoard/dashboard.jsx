import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import './Dashboard.scss';

function UserProfile({user, match, activeUser}) {
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage.user.data;
    // console.log(userLocalStorage.user.data.uid);
    const dispatch = useDispatch()
    // console.log(user)
    // console.log(localStorageUser);

    const [uid] = useState(match.params.userId);

    useEffect(() => {

        if(!user || uid !== localStorageUser.uid ) {
            dispatch(getUser(localStorageUser.uid));
        }

    }, [user, dispatch, activeUser, localStorageUser, uid]);

    function activeSection({target}) {
        const favoritesButton = document.getElementById('favoritesID');
        const favoritesSection = document.getElementById('favoritesSectionID');
        const commentsButton = document.getElementById('commentsID');
        const commentsSection = document.getElementById('commentsSectionID');
        const personalInfoButton = document.getElementById('personalInfoID');
        const personalInfoSection = document.getElementById('personalInfoSectionID');
        const usefulInfoButton = document.getElementById('usefulInfoID');
        const usefulInfoSectionID = document.getElementById('usefulInfoSectionID');

        switch (target.id) {
            case "favoritesID":
                favoritesButton.className = "btn--active";
                favoritesSection.style.display = 'block';
                commentsButton.className = 'section__btn';
                commentsSection.style.display = 'none';
                personalInfoButton.className = 'section__btn';
                personalInfoSection.style.display = 'none';
                usefulInfoButton.className = 'section__btn';
                usefulInfoSectionID.style.display = 'none';
                break;
            case "commentsID":
                favoritesButton.className = "section__btn";
                favoritesSection.style.display = 'none';
                commentsButton.className = 'btn--active';
                commentsSection.style.display = 'block';
                personalInfoButton.className = 'section__btn';
                personalInfoSection.style.display = 'none';
                usefulInfoButton.className = 'section__btn';
                usefulInfoSectionID.style.display = 'none';
                break;
            case "personalInfoID":
                favoritesButton.className = "section__btn";
                favoritesSection.style.display = 'none';
                commentsButton.className = 'section__btn';
                commentsSection.style.display = 'none';
                personalInfoButton.className = 'btn--active';
                personalInfoSection.style.display = 'block';
                usefulInfoButton.className = 'section__btn';
                usefulInfoSectionID.style.display = 'none';
                break;
            case "usefulInfoID":
                favoritesButton.className = "section__btn";
                favoritesSection.style.display = 'none';
                commentsButton.className = 'section__btn';
                commentsSection.style.display = 'none';
                personalInfoButton.className = 'section__btn';
                personalInfoSection.style.display = 'none';
                usefulInfoButton.className = 'btn--active';
                usefulInfoSectionID.style.display = 'block';
                break;
            default:
                break;
        }
    }

    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <div className="profile__image"></div>
                    <p className="full__name">Full Name</p>
                    <p className="alias">({user?.displayName})</p>
                    <button className="section__btn" id="favoritesID" onClick={(id) => activeSection(id)}>Favorites</button>
                    <button className="section__btn" id="commentsID" onClick={(id) => activeSection(id)}>Comments</button>
                    <button className="section__btn" id="personalInfoID" onClick={(id) => activeSection(id)}>Personal Information</button>
                    <button className="section__btn" id="usefulInfoID" onClick={(id) => activeSection(id)}>Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    <div className='favorites__section' id="favoritesSectionID">
                        {user?.favorites?.length > 0 && user.favorites.map((videogame) => (
                            <p>{videogame.game.first_title}</p>
                        ))}
                    </div>
                    <div className='comments__section' id="commentsSectionID">
                            <p>Comments Section</p>
                    </div>
                    <div className='personal__info__section' id="personalInfoSectionID">
                            <p>Personal Info Section</p>
                    </div>
                    <div className='useful__info__section' id="usefulInfoSectionID">
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