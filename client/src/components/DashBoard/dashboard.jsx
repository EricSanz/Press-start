import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.scss';

function UserProfile({user, match, isLogged}) {
    const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user;
    const localStorageUserData = userLocalStorage?.user?.data;

    const dispatch = useDispatch();
    let history = useHistory();

    const [googleUserState, setGoogleUserState] = useState(false);
    const [uid] = useState(match.params.userId);
    const [expandPayment, setExpandPayment] = useState(true); 
    const [expandShippingPolicy, setExpandShippingPolicy] = useState(true);
    // const [expandReturn, setExpandReturn] = useState(true);

    const userId = user?.uid;

    // const sectionButtons = document?.querySelectorAll('.section__btn');

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

    const payments = document.getElementById('payment');

    payments?.addEventListener('click', () => {
        const paymentMethods = document.getElementById('payment__methods--id');
        const paymentIcon = document.getElementById('payment__icon');
        setExpandPayment(!expandPayment);
        expandPayment ? paymentMethods.style.display = 'flex' : paymentMethods.style.display = 'none';
        expandPayment ? payments.style.backgroundColor = '#f0f2f2' : payments.style.backgroundColor = '#fff';
        expandPayment ? paymentIcon.style.transform = 'rotate(180deg)' : paymentIcon.style.transform = 'rotate(0deg)';
    });

    const shippingPolicy = document.getElementById('shipping__policy--id');
    
    shippingPolicy?.addEventListener('click', () => {
        const shippingPolicyContent = document.getElementById('shipping__policy__content--id');
        const shippingPolicyIcon = document.getElementById('shipping__policy--icon');
        setExpandShippingPolicy(!expandShippingPolicy);
        expandShippingPolicy ? shippingPolicyContent.style.display = 'flex' : shippingPolicyContent.style.display = 'none';
        expandShippingPolicy ? shippingPolicy.style.backgroundColor = '#f0f2f2' : shippingPolicy.style.backgroundColor = '#fff';
        expandShippingPolicy ? shippingPolicyIcon.style.transform = 'rotate(180deg)' : shippingPolicyIcon.style.transform = 'rotate(0deg)';
    })

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
                        {user?.favorites?.length > 0 && user?.favorites.map((videogame) => (
                            <p key={videogame.id}>{videogame?.game?.first_title}</p>
                        ))}
                    </div>
                    <div className='section section--not--active' id="commentsSectionID">
                        <p className='title'>Comments Section</p>
                    </div>
                    <div className='section section--not--active' id="usefulInfoSectionID">
                        <h1 className='title'>Useful Information</h1>
                        <div className='useful__information--container'>
                            <div className='payment__methods' id="payment">
                                <h3>Payment Methods:<span><FontAwesomeIcon id="payment__icon" className="expand" icon="angle-double-down"/></span></h3>
                                <div id="payment__methods--id" className="payment__methods--content">
                                    <p>- You can pay for your order or reservation with the following methods:</p>
                                    <ul>
                                        <li className='item__list'>Credit Card (connected with La Caixa's secure service, Addon Payments)</li>
                                        <li className='item__list'>Easy Transfer or ATM payment to our La Caixa account</li>
                                        <li className='item__list'>Bizum</li>
                                        <li className='item__list'>Paypal</li>
                                    </ul>
                                    <h3>For your security:</h3>
                                    <p className='title__list'>Credit Card:</p>
                                    <ul>
                                        <li className='item__list'>In Press Start store we want our customers to pay on the Internet in an agile and secure way. That is why we decided to look for a specialized entity that would allow us to offer payment by credit card in a completely secure way. The "Addon Payments" system of "La Caixa" allows us to offer this service with the maximum guarantees, with security systems such as Verified by VISA and MasterCard Secure Code. In addition, "La Caixa" uses a Secure Server of the latest technology so that others cannot see your data.</li>
                                        <li className='item__list'>Your order will only be charged once. There is a possibility that the charge will appear twice on your card statement. This is part of a usual collection procedure by banks to ensure the viability of the collection, so they retain the amount in question since the order is received until the collection is made by Press Start.</li>
                                        <li className='item__list'>Press Start makes the collection of the order at the time of validating the authenticity of the transaction. In some occasions, the unblocking of the withholding or double charge mentioned above may overlap with the actual collection of the order. This incidence is totally alien to Press Start and obeys to the existing operation in Spain between the banks and the issuers of the cards. In these cases we recommend that you contact your bank to expedite the unlocking of the pre-authorization.</li>
                                        <li className='item__list'>For payments made with cards issued outside Spain, the issuing bank must be a member of the Secure Electronic Commerce Security protocol. Payments with cards that do not comply with this requirement will not be authorized. In this case we recommend payment by bank transfer or PayPal.</li>
                                        <li className='item__list'>Press Start reserves the right to delay the management of suspicious orders and reject any transaction made by credit card. In this case we will proceed to refund the amount on the original card.</li>
                                    </ul>
                                    <p className='title__list'>Off-Line Payments:</p>
                                    <p>We offer two off-line payment options: bank transfer or ATM payment. When you choose this payment method and confirm your order, we will provide you with the necessary information to make the payment. You have 3 working days to order the transfer after placing your order.</p>
                                    <p className='important'>*Important Note: <span>Window deposits will not be accepted by La Caixa.</span></p>
                                    <ul>
                                        <li className='item__list'>Bank Transfer: Our customers have the possibility to make a bank transfer to our La Caixa account. The necessary information will be displayed on the screen after confirming the order and will be sent by e-mail. Entering the order number in the field of CONCEPT is essential for the identification of your payment.</li>
                                        <li className='item__list'>ATM Payments: This payment method allows you to pay without entering your credit card number on the website. It is a very simple process, the steps are as follows:</li>
                                        <ol>
                                            <li className='item__list'>Touch the button "Payments with barcode" located at the top left of the screen.</li>
                                            <li className='item__list'>Place the barcode on the document facing the reader.</li>
                                            <li className='item__list'>If the data is correct, touch the "Confirm" button to confirm it.</li>
                                            <li className='item__list'>In case the reader has any problems with the barcode, you have the option to manually enter the barcode numbers.</li>
                                            <p className='item__list'>Remember that this service is available 24 hours a day, every day of the year and that you can benefit from this form of payment with any La Caixa or other credit or debit card, all at no additional cost.</p>
                                        </ol>
                                    </ul>
                                    <p className='title__list'>PayPal:</p>
                                    <p>We also offer the option of payment by PayPal, the leaders in online transactions in the world: with millions of users, it is a system of all confidence and convenience, and without commissions.</p>
                                </div>
                            </div>
                            <div className='shipping__policy' id="shipping__policy--id">
                                <h3>Delivery options and shipping policy:<span><FontAwesomeIcon id="shipping__policy--icon" className="expand" icon="angle-double-down"/></span></h3>
                                <div className='shipping__policy--content' id='shipping__policy__content--id'>
                                    <p className='item--p important'>- Order processing and shipping:</p>
                                    <p className='item--p'>All order processing is done through the website, for security reasons we do not process orders via phone or email.</p>
                                    <p className='item--p'>The shipment of the goods, except for product reservations, is made the same day of receipt of the payment confirmation if it is sent to us before 18:00 hours (working days).</p>
                                    <p className='item--p'>The shipment of an order is pending until all products are available. To avoid delays in the delivery of available products, we recommend that you do not mix reserved products with available products and place orders separately.</p>
                                    <p className='item--p important'>- Shipping costs:</p>
                                    <p className='item--p'>At Press Start we calculate shipping costs according to the total weight of the order and the shipping zone. We work with different shipping companies, which you can choose when placing your order or booking: </p>
                                    <ul>
                                        <li className='item__list'>SEUR 24-48 hours service. - National shipments peninsula, Balearic Islands and Portugal.</li>
                                        <li className='item__list'>Correos Express 24-48 hours service. - National shipments peninsula.</li>
                                        <li className='item__list'>Service TIPSA-Aravinc 24-48 hours. - National shipments peninsula.</li>
                                        <li className='item__list'>PAACK Afterwork Service - Same day delivery (Only available in Barcelona*).</li>
                                        <li className='item__list'>Correos Express Maritime Service 48/72 hours. - Balearic Islands.</li>
                                        <li className='item__list'>Correos Express International Service - Europe**</li>
                                        <li className='item__list'>Certified or Urgent Certified Mail Service. - Canary Islands, Andorra, Ceuta and Melilla.</li>
                                        <p className='item--p'>* Same day shipping offered through PAACK, for orders placed on working days until 17:00h (available for Barcelona city and neighboring towns).</p>
                                        <p className='item--p'>** International shipping to the following destinations: Belgium, Czech Republic, Denmark, France, Germany, Holland, Hungary, Italy, Luxembourg, Poland, Czech Republic.</p>
                                    </ul>
                                    <p className='item--p important'>- General conditions:</p>
                                    <p className='item--p'>Prices subject to change without notice.</p>
                                    <p className='item--p'>Estimated delivery times.</p>
                                    <p className='item--p'>Delivery times are valid during working days (no deliveries will be made on Saturdays, Sundays or holidays). Orders placed after 6:00 p.m. will be processed the next working day.</p>
                                    <p className='item--p'>We do not deliver to PO Boxes.</p>
                                    <p className='item--p'>If you have not received your order within 3 days, please contact the transport company to arrange a suitable delivery time.</p>
                                </div>
                            </div>
                            <div>
                                <h3>Frequently Asked Questions. (FAQS)</h3>
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