import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import './Dashboard.scss';

function UserProfile(user) {
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