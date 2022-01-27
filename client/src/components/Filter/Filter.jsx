import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterVideogameByPlatform, fillVideogameByPlatformList } from '../../redux/actions/videogameActions'
import './Filter.scss';
import '../List/VideogamesList.scss';

function FilterComponent({dispatch}) {

    const [inputNav, setInputNav] = useState(true);

    function handleInputNav() {

        setInputNav(!inputNav);

        const openInputNav = document.getElementById('filter__options-id');
        const cardContainer = document.getElementById('list__container-id');
        const filterIconRight = document.getElementById('filter__icon__right-id');
        const filterIconLeft = document.getElementById('filter__icon__left-id');
        const filterButton = document.getElementById('filter__button-id');
        const filterTagOpen = document.getElementById('filter__tag__open-id');
        const filterTagClose = document.getElementById('filter__tag__close-id');
        inputNav ? openInputNav.style.transform = 'translateX(250px)' : openInputNav.style.transform = 'translateX(0px)';
        inputNav ? cardContainer.style['padding-left'] = '235px' : cardContainer.style['padding-left'] = '0px';
        inputNav ? filterIconRight.style.display = 'none' : filterIconRight.style.display = 'block';
        inputNav ? filterIconLeft.style.display = 'block' : filterIconLeft.style.display = 'none';
        inputNav ? filterButton.style.background = '#161616af' : filterButton.style.background = '#e15b64';
        inputNav ? filterButton.style.color = '#fff' : filterButton.style.color = '#161616';
        inputNav ? filterButton.style.transform = 'translateX(46px) translateY(-50px) rotate(-90deg)' : filterButton.style.transform = 'translateX(0px) translateY(0px) rotate(0deg)';
        inputNav ? filterTagOpen.style.display = 'none' : filterTagOpen.style.display = 'block';
        inputNav ? filterTagClose.style.display = 'block' : filterTagClose.style.display = 'none';
    }

    function handleChangeChecked({ target }) {
      target.checked ? dispatch(filterVideogameByPlatform(target.value)) : dispatch(fillVideogameByPlatformList());
    }

    return (
        <>
            <div className="filter__button" id="filter__button-id" onClick={() => handleInputNav()}>
                <p className="filter__tag" id="filter__tag__open-id">Filters</p>
                <p className="filter__tag" id="filter__tag__close-id">Close</p>
                <FontAwesomeIcon id="filter__icon__right-id" className="filter__icon" icon="angle-double-right" />
                <FontAwesomeIcon id="filter__icon__left-id" className="filter__icon" icon="angle-double-left" />
            </div>
            <div className="filter__options-container" id="filter__options-id">
              <div className="filter__options-toolbar">
                <p className="filter__title">Platforms:</p>
                <p></p>
                <div>
                  <input type="radio" id="allPlatforms" value="allPlatforms" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--allplatforms" htmlFor="allPlatforms">All Platforms</label>
                </div>
                <div>
                  <input type="radio" id="ps4" value="ps4" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--ps4" htmlFor="ps4">PlayStation 4</label>
                </div>
                <div>
                  <input type="radio" id="ps5" value="ps5" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--ps5" htmlFor="ps5">PlayStation 5</label>
                </div>
                <div>
                  <input type="radio" id="xboxOne" value="xboxOne" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--xboxone" htmlFor="xboxOne">Xbox One</label>
                </div>
                <div>
                  <input type="radio" id="xboxSeriesSX" value="xboxSeriesSX" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--xboxseriesxs" htmlFor="xboxSeriesSX">Xbox Series S/X</label>
                </div>
                <div>
                  <input type="radio" id="nintendoSwitch" value="nintendoSwitch" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--nintendoswitch" htmlFor="nintendoSwitch">Nintendo Switch</label>
                </div>
                <div>
                  <input type="radio" id="pc" value="pc" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--pc" htmlFor="pc">PC</label>
                </div>
                <p className="filter__title">Offer:</p>
                <div>
                  <input type="radio" id="notSale" value="notSale" name="sales" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--notsale" htmlFor="notSale">All Prices</label>
                </div>
                <div>
                  <input type="radio" id="onSale" value="onSale" name="sales" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--onsale" htmlFor="onSale">On sale</label>
                </div>
                <p className="filter__title">Price:</p>
                <div>
                  <input type="radio" id="lowHigh" value="lowHigh" name="prices" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--lowhigh" htmlFor="lowHigh">Lowest to highest</label>
                </div>
                <div>
                  <input type="radio" id="highLow" value="highLow" name="prices" onChange={(value) => handleChangeChecked(value)}/>
                  <label className="label--highlow" htmlFor="highLow">Highest to lowest</label>
                </div>
              </div>
            </div>
        </>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(FilterComponent);
