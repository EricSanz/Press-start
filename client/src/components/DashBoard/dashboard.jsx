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

    }, [user, dispatch, activeUser, localStorageUser, uid])

    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <div className="profile__image"></div>
                    <p className="full__name">Full Name</p>
                    <p className="alias">({user?.displayName})</p>
                    <button className="favorites__btn">Favorites</button>
                    <button className="comments__btn">Comments</button>
                    <button className="personal__info__btn">Personal Information</button>
                    <button className="useful__info__btn">Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    {user?.favorites?.length > 0 && user.favorites.map((videogame) => (
                        <p>{videogame.game.first_title}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user,
        // activeUser: userReducer.activeUser,
        isLogged: userReducer.isLogged,
    }
}

export default connect(mapStateToProps)(UserProfile);