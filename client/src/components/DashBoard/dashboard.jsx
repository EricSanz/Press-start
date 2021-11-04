import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';

function UserProfile() {
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    // console.log(userLocalStorage.user.data.uid);
    const dispatch = useDispatch()

    // const [userId] = useState(userLocalStorage.user.data.uid);


    return (
        <>

            <p>HEEEY</p>
        </>
    )
}

function mapStateToProps({ userReducer }) {
    return {
        user: userReducer.user
    }
}

export default connect(mapStateToProps)(UserProfile);