import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import './Dashboard.scss';

function UserProfile({user}) {
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const activeUser = userLocalStorage.user.data;
    // console.log(userLocalStorage.user.data.uid);
    const dispatch = useDispatch()
    console.log(user)
    console.log(activeUser);

    // const [userId] = useState(userLocalStorage.user.data.uid);


    return (
        <div className="profile__container">
            <div className="profile">
                <div className="profile__left__container">
                    <div className="profile__image"></div>
                    <p className="full__name">Full Name</p>
                    <p className="alias">({user.displayName})</p>
                    <button className="favorites__btn">Favorites</button>
                    <button className="comments__btn">Comments</button>
                    <button className="personal__info__btn">Personal Information</button>
                    <button className="useful__info__btn">Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
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