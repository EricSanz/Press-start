import React, {useState, useEffect} from 'react';
import { getUser } from '../../../redux/actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/ProfilePic';
import './UsefulInformation.scss';

function UsefulInformation({user, match}) {

    let userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
    const localStorageUser = userLocalStorage?.user;
    const localStorageUserData = userLocalStorage?.user?.data;

    const dispatch = useDispatch();
    
    let googleUser = false;
    let emailUser = false;

    let toggle = false;

    const [googleUserState, setGoogleUserState] = useState(false);
    const [favoritesUpdated, setFavoritesUpdated] = useState(false);
    const [uid] = useState(match.params.userId);
    
    const userId = user?.uid;

    const [expandPayment, setExpandPayment] = useState(true);
    const [expandShippingPolicy, setExpandShippingPolicy] = useState(true);
    const [expandFaqs, setExpandFaqs] = useState(true);
    const [profilePictureOptions, setProfilePictureOptions] = useState(true);

    useEffect(() => {

        if((!user || uid !== localStorageUserData?.uid) && localStorageUserData !== undefined) {
            dispatch(getUser(localStorageUserData?.uid));
        }
        if((!user || uid !== localStorageUser?.uid) && localStorageUser !== undefined) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (!user && localStorageUser) {
            dispatch(getUser(localStorageUser?.uid));
        }
        
        if(!user && userLocalStorage && googleUserState) {
            dispatch(getUser(localStorageUser?.uid));
        }

        if (localStorageUser === undefined && !googleUserState) {
            dispatch(getUser(user?.uid));
            setGoogleUserState(!googleUserState);
        }

    }, [user, user?.favorites?.length, profilePictureOptions, toggle, localStorageUserData, localStorageUser, setFavoritesUpdated, favoritesUpdated, dispatch, userLocalStorage, uid, googleUserState, userId, googleUser, emailUser]);

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

    const faqs = document.getElementById('faqs--id');

    faqs?.addEventListener('click', () => {
        const faqsContent = document.getElementById('faqs__content--id');
        const faqsIcon = document.getElementById('faqs--icon');
        setExpandFaqs(!expandFaqs);
        expandFaqs ? faqsContent.style.display = 'flex' : faqsContent.style.display = 'none';
        expandFaqs ? faqs.style.backgroundColor = '#f0f2f2' : faqs.style.backgroundColor = '#fff';
        expandFaqs ? faqsIcon.style.transform = 'rotate(180deg)' : faqsIcon.style.transform = 'rotate(0deg)';
    })

    const changeProfilePic = document.getElementById('change__profile__pic--id');
    const profilePicOptions = document.getElementById('prodile__pic__options--id');

    changeProfilePic?.addEventListener('click', () => {
        setProfilePictureOptions(!profilePictureOptions);
        toggle = !toggle;
        profilePictureOptions ? profilePicOptions.style.display = 'block' : profilePicOptions.style.display = 'none';
    })

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
                    <a href={`/dashboard/${userId}`}>
                        <button className="section__btn">Personal Information</button>
                    </a>
                    <a href={`/dashboard/${userId}/favorites`}>
                        <button className="section__btn">Favorites</button>
                    </a>
                    <Link to={`/dashboard/${userId}`}>
                        <button className="section__btn">Comments</button>
                    </Link>
                    <button className="section__btn btn--active">Useful Information</button>
                    <button className="logout__btn">Log out</button>
                </div>
                <div className="profile__right__container">
                    <div className='section'>
                        <h1 className='title'>Useful Information</h1>
                        <div className='useful__information--container'>
                            <div className='info__us'>
                                <p className='info__us--p'>{`New here? Welcome to Press Start, let us tell you a little bit more about us :)`}</p>
                                <h3 className='info__us--h3'>Who are we?</h3>
                                <ul>
                                    <li className='info__list'>We are a group of passionate gamers, with more than 20 years of experience, who decided to offer the spirit of a specialized neighborhood store but directly in the warmth of your home.</li>
                                    <li className='info__list'>This experience supports us and guarantees us the possibility to offer a quality service with significant discounts, a large catalog with products in stock, which virtually no other store can offer, and the availability of the most sought after products, all this with great speed and professionalism!</li>
                                    <li className='info__list'>We are your platform to fun for more than a decade with headquarters and warehouse in Barcelona. Video games, consoles, accessories, merchandising and much more, official packers of universes of the main gaming brands, always with professionalism, personalized treatment and passion, from players to players.</li>
                                </ul>
                            </div>
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
                            <div className='faqs' id="faqs--id">
                                <h3>Frequently Asked Questions. (FAQS)<span><FontAwesomeIcon id="faqs--icon" className="expand" icon="angle-double-down"/></span></h3>
                                <div className='faqs__content' id="faqs__content--id">
                                    <ul>
                                        <li className='item__list important'>When will my order arrive?</li>
                                        <p className='item--p'>We handle all shipments from Monday to Friday of products in stock that are confirmed before 6:30 pm. Orders placed after that time will be shipped the next business day. All weekend orders will be shipped on Mondays, there is no delivery on Saturdays and Sundays. Digital deliveries have the same conditions.</p>
                                        <li className='item__list important'>What happens if the price of a product I have reserved changes before its launch?</li>
                                        <p className='item--p'>If the official price (PVPR) of a product you have reserved goes up, we will not charge you the new price, we will respect the price at which you reserved the product. If the official price goes down compared to when you made the reservation, we will always keep the lower price when converting your reservation.</p>
                                        <li className='item__list important'>A product is out of stock, will you have more?</li>
                                        <p className='item--p'>We know how important it is to have a wide catalog of products, so we always try to replenish the out of stock products. It is not always possible as many are being discontinued, but if you mark the item with the "Add to Preferred" button on the item's card, you will receive an automatic email when we receive the stock. In addition, you can always consult with our customer service team at store@presstart.com to find out if a product is out of stock or not.</p>
                                        <li className='item__list important'>How can I track my order?</li>
                                        <p className='item--p'>The day the product is shipped, you will receive an automatic email with the shipping number, the carrier's phone number and the link that leads directly to the tracking page of the package.</p>
                                        <li className='item__list important'>How can I cancel an unpaid order?</li>
                                        <p className='item--p'>The customer can not cancel an order from his account that is pending payment, but he has no obligation to finalize it, he only has to request the cancellation through the email store@presstart.com and we will manage it.</p>
                                        <li className='item__list important'>I don't want to pay shipping costs twice, can I combine reservations?</li>
                                        <p className='item--p'>Of course you can! To combine reservations and receive them in the same order, 2 requirements must be met: 1. You have paid the deposit for both reservations. 2. You have not converted any of the 2 reservations (i.e. you have not proceeded to make the full payment). In this case, the "Combine" button will appear next to your reservations. Once you click it, you will be able to select the reservations you wish to combine into one order.</p>
                                        <li className='item__list important'>I have requested a cancellation/refund, but the deposit is not included.</li>
                                        <p className='item--p'>If you have requested a cancellation/refund of a reservation, we are sorry but we do not refund the deposit, except in exceptional circumstances such as cancellation by the supplier of the product or continued delay of the product.</p>
                                        <li className='item__list important'>I paid the order by bank transfer and it is still pending payment, why?</li>
                                        <p className='item--p'>Contrary to the other payment methods that are reflected immediately on the web, the bank transfer method is somewhat slower. Between different banks, the confirmation of a transfer can take between 24/48 hours. If you have made the transfer from our bank (La Caixa) it may take a few hours to be confirmed, until our accounting department verifies the deposit in our account.</p>
                                        <li className='item__list important'>Where can I get an invoice for my purchases?</li>
                                        <p className='item--p'>With your orders you will receive a packing slip, but not an invoice. You can download the invoice for your orders from "My Account". Through the order history you will be able to download the invoice for each of your purchases.</p>
                                    </ul>
                                </div>
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
        favoritesGamesID: userReducer.favoritesGamesID,
    }
}

export default connect(mapStateToProps)(UsefulInformation);

// export default UsefulInformation;