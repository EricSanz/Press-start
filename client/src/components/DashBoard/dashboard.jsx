import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser, updateUserInfo } from '../../redux/actions/userActions';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePic from './ProfilePic/ProfilePic';
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

    const changeProfilePic = document.getElementById('change__profile__pic--id');
    const profilePicOptions = document.getElementById('prodile__pic__options--id');

    changeProfilePic?.addEventListener('click', () => {
        setProfilePictureOptions(!profilePictureOptions);
        toggle = !toggle;
        profilePictureOptions ? profilePicOptions.style.display = 'block' : profilePicOptions.style.display = 'none';
    })

    const changeInfo = document.getElementById('change__info--id');

    changeInfo?.addEventListener('click', () => {

    })

    const saveChanges = document.getElementById('save__changes--id');
    const updateInfo = document.getElementById('update__info--id');
    const personalInfoSubmit = document.getElementById('personal__info__submit--id');
    const personalInfo = document.getElementById('personal__info--id');
    const firstNameInput = document.getElementById('input__firstname--id');
    const lastNameInput = document.getElementById('input__lastname--id');
    const displayNameInput = document.getElementById('input__displayname--id');
    const birthDateInput = document.getElementById('input__birthdate--id');
    const mobileInput = document.getElementById('input__mobile--id');
    const landlineInput = document.getElementById('input__landline--id');
    
    saveChanges?.addEventListener('click', () => {
        let genderOptions = document.querySelectorAll('.gender__options');
        let gender;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const displayName = displayNameInput.value;
        const birthDate = birthDateInput.value;
        const mobile = mobileInput.value;
        const landline = landlineInput.value;

        for (let i = 0; i < genderOptions.length; i++) {
            if (genderOptions[i].checked) {
                gender = genderOptions[i].value;
            }
        }
        dispatch(updateUserInfo(userId, firstName, lastName, displayName, birthDate, gender, mobile, landline));
        const updateUser = () => dispatch(getUser(userId));;
        setTimeout(updateUser, 500);

        personalInfoSubmit.classList.add('not--active');
        personalInfo.classList.remove('not--active');
    })
    
    updateInfo?.addEventListener('click', () => {
        personalInfoSubmit.classList.remove('not--active')
        personalInfo.classList.add('not--active')
    })

    let userBirthdate = user?.birthDate;
    userBirthdate = userBirthdate?.slice(0,-14);

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
                    <div className='section'>
                        <h1 className='title'>Personal Information</h1>
                        <div className='personal__info--container' id='personal__info--id'>
                            <div className='personal--container'>
                                <p className='mini__title'>Personal Information:</p>
                                <div className='names--container'>
                                    <div className='name'>
                                        <label htmlFor="name">First name:</label>
                                        <p className='firstname'>{user?.firstName}</p>
                                    </div>
                                    <div className='lastname'>
                                        <label htmlFor="lastname">Last name:</label>
                                        <p className='lastnameP'>{user?.lastName}</p>
                                    </div>
                                    <div className='displayname'>
                                        <label htmlFor="displayname">Alias:</label>
                                        <p className='alias'>{user?.displayName}</p>
                                    </div>
                                </div>
                                <div className='birthdate'>
                                    <label htmlFor="birthdate">Birth date:</label>
                                    <p className='birthdateP'>{userBirthdate}</p>
                                </div>
                                <div className='gender--container'>
                                    <p>Gender:</p>
                                    <div className='gender'>
                                        <input type="radio" name='gender' className={user?.gender === 'Male' ? 'gender__checked' : 'gender__not__checked'} id="male__disabled--id" value='Male' disabled/>
                                        <label htmlFor="gender">Male</label>
                                        <input type="radio" name='gender' className={user?.gender === 'Female' ? 'gender__checked' : 'gender__not__checked'} id="female__disabled--id" value='Female' disabled/>
                                        <label htmlFor="gender">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='contact--container'>
                                <p className='mini__title'>Contact Information:</p>
                                <div className='contact__options'>
                                    <div className='mobile'>
                                        <label htmlFor="mobile">Mobile phone:</label>
                                        <p className='mobileP'>{user?.mobile}</p>
                                    </div>
                                    <div className='landline'>
                                        <label htmlFor="landline">Land line:</label>
                                        <p className='landlineP'>{user?.landline}</p>
                                    </div>
                                </div>
                                <button className='submit' type='button' id="update__info--id">Change information</button>
                            </div>
                        </div>
                        <div className='personal__info--container not--active' id='personal__info__submit--id'>
                            <div className='personal--container'>
                                <p className='mini__title'>Personal Information:</p>
                                <div className='names--container'>
                                    <div className='name'>
                                        <label htmlFor="name">First name:</label>
                                        <input type="text" name='name' id="input__firstname--id"></input>
                                    </div>
                                    <div className='lastname'>
                                        <label htmlFor="lastname">Last name:</label>
                                        <input type="text" name='lastname' id='input__lastname--id'></input>
                                    </div>
                                    <div className='displayname'>
                                        <label htmlFor="displayname">Alias:</label>
                                        <input type="text" name='displayname' id='input__displayname--id'></input>
                                    </div>
                                </div>
                                <div className='birthdate'>
                                    <label htmlFor="birthdate">Birth date:</label>
                                    <input type='date' name='birthdate' id="input__birthdate--id"></input>
                                </div>
                                <div className='gender--container'>
                                    <p>Gender:</p>
                                    <div className='gender'>
                                        <input type="radio" name='gender' className={user?.gender === 'Male' ? 'gender__checked gender__options' : 'gender__not__checked gender__options'} id="male__abled--id" value='Male'/>
                                        <label htmlFor="gender">Male</label>
                                        <input type="radio" name='gender' className={user?.gender === 'Female' ? 'gender__checked gender__options' : 'gender__not__checked gender__options'} id="female__abled--id" value='Female'/>
                                        <label htmlFor="gender">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='contact--container'>
                                <p className='mini__title'>Contact Information:</p>
                                <div className='contact__options'>
                                    <div className='mobile'>
                                        <label htmlFor="mobile">Mobile phone:</label>
                                        <input type="text" name='mobile' id="input__mobile--id"/>
                                    </div>
                                    <div className='landline'>
                                        <label htmlFor="landline">Land line:</label>
                                        <input type="text" name='landline' id='input__landline--id'/>
                                    </div>
                                </div>
                                <button className='submit' type='button' id="save__changes--id">Save changes</button>
                            </div>
                        </div>

                        <div className='change__password--container'>
                            <p className='mini__title'>Change your password:</p>
                            <div className='password__options'>
                                <div className='old__password'>
                                    <label htmlFor="oldPassword">Actual password:</label>
                                    <input type="password" name='oldPassword'/>
                                </div>
                                <div className='new__password'>
                                    <label htmlFor="newPassword">New password:</label>
                                    <input type="text" name='newPassword' />
                                </div>
                                <button className='submit' type='button' >Change password</button>
                            </div>
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
    }
}

export default connect(mapStateToProps)(UserProfile);