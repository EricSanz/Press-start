import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeProfilePic, getUser } from '../../../redux/actions/userActions';
import './ProfilePic.scss';

function ProfilePic({profilePicOptions, profilePictureOptions, setProfilePictureOptions, user, dispatch}) {

    const picOptionsUrls = [
        {
            name: 'Geralt of Rivia',
            url: 'https://i.ibb.co/YdZXn5d/profile-Geralt-of-rivia.png'
        },
        {
            name: 'Aloy',
            url: 'https://i.ibb.co/M94PV9t/profile-aloy.png'
        },
        {
            name: 'Kratos',
            url: 'https://i.ibb.co/LQQLsHf/profile-kratos.png'
        }
    ]

    const saveButton = document.getElementById('save__btn--id');
    const closeOptions = document.getElementById('close__options--id');
    const options = document.querySelectorAll('.options--id');
    const userId = user?.uid;
    
    saveButton?.addEventListener('click', () => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                const photoUrl = options[i].value;
                dispatch(changeProfilePic(userId, photoUrl));
            }
        }
        profilePicOptions.style.display = 'none';
        setProfilePictureOptions(!profilePictureOptions)
        dispatch(getUser(user?.uid))
    })

    closeOptions?.addEventListener('click', () => {
        profilePicOptions.style.display = 'none';
        setProfilePictureOptions(!profilePictureOptions)
    })

    return (
        <>
            <p className='title__options'>Choose your profile picture:</p>
            <FontAwesomeIcon id='close__options--id' className='close__options' icon="times" />
            <button name='options' className='save__btn' id='save__btn--id'>Save</button>
            <div className='pic__option--container'>
                {picOptionsUrls.map((picOption) => (
                    <div className='pic__option'>
                        <img src={picOption.url} alt={picOption.name} className='option__image'/>
                        <div className='input--container'>
                            <input className='checkbox__option options--id' type="radio" value={picOption.url} name='options'/>
                            <label htmlFor={picOption.name} className='option__name'>{picOption.name}</label>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProfilePic;
