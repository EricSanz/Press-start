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
        },
        {
            name: 'Cloud Strife',
            url: 'https://i.ibb.co/nMYVTkB/profile-Cloud-Strife.png'
        },
        {
            name: 'Ellie',
            url: 'https://i.ibb.co/v4fbsz6/profile-ellie-tlou.png'
        },
        {
            name: 'Samus Aran',
            url: 'https://i.ibb.co/HKCBvcG/profile-samus-aran.png'
        },
        {
            name: 'Crash Bandicoot',
            url: 'https://i.ibb.co/SxxDsBC/profile-crash-bandicoot.png'
        },
        {
            name: 'Link',
            url: 'https://i.ibb.co/crtm8rn/profile-link.png'
        },
        {
            name: 'Mario',
            url: 'https://i.ibb.co/84GLmPv/profile-mario.png'
        }
    ]

    const saveButton = document.getElementById('save__btn--id');
    const closeOptions = document.getElementById('close__options--id');
    const userId = user?.uid;
    
    saveButton?.addEventListener('click', () => {
        let options = document.querySelectorAll('.options--id');
        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                let photoUrl = options[i].value;
                dispatch(changeProfilePic(userId, photoUrl));
                if (user) {
                }
            }
        }
        dispatch(getUser(userId));

        profilePicOptions.style.display = 'none';
        setProfilePictureOptions(!profilePictureOptions);
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
                    <div className='pic__option' key={picOption.name}>
                        <img src={picOption.url} alt={picOption.name} className='option__image'/>
                        <div className='input--container'>
                            <input className={picOption.url === user?.photoURL ? 'checkbox__option checked options--id' : 'checkbox__option options--id'} type="radio" value={picOption.url} name='options'/>
                            <label htmlFor={picOption.name} className='option__name'>{picOption.name}</label>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProfilePic;
