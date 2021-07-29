import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filterVideogameByPlatform, fillVideogameByPlatformList, filterVideogameBySale, fillVideogameBySaleList } from '../../redux/actions/videogameActions'
import './Filter.scss';
import '../List/VideogamesList.scss';

function FilterComponent({dispatch}) {

    const [inputNav, setInputNav] = useState(false);
    const [platformFilter, setPlatformFilter] = useState(false);
    const [salesFilter, setSalesFilter] = useState(false);

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
        inputNav ? cardContainer.style['padding-left'] = '150px' : cardContainer.style['padding-left'] = '0px';
        inputNav ? filterIconRight.style.display = 'none' : filterIconRight.style.display = 'block';
        inputNav ? filterIconLeft.style.display = 'block' : filterIconLeft.style.display = 'none';
        inputNav ? filterButton.style.background = '#161616af' : filterButton.style.background = '#e15b64';
        inputNav ? filterButton.style.color = '#fff' : filterButton.style.color = '#161616';
        inputNav ? filterTagOpen.style.display = 'none' : filterTagOpen.style.display = 'block';
        inputNav ? filterTagClose.style.display = 'block' : filterTagClose.style.display = 'none';
    }

    function handleChangeChecked({ target }) {
        setPlatformFilter(!platformFilter);

        const onSaleOption = document.getElementById('onSale');
        onSaleOption.checked ? dispatch(fillVideogameBySaleList()) : console.log('hola');
        if (onSaleOption.checked) {
          onSaleOption.checked = false;
        }

        target.checked ? dispatch(filterVideogameByPlatform(target.value)) : dispatch(fillVideogameByPlatformList());
    }

    function handleChangeSales({ target }) {
      setSalesFilter(!salesFilter);

      const ps4Option = document.getElementById('ps4');
      const ps5Option = document.getElementById('ps5');
      const xboxOneOption = document.getElementById('xboxOne');
      const xboxSeriesSXOption = document.getElementById('xboxSeriesSX');
      const nintendoSwitch5Option = document.getElementById('nintendoSwitch');
      const pcOption = document.getElementById('pc');
      const allPlatformsOption = document.getElementById('allPlatforms');

      ps4Option.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      ps5Option.checked ? dispatch(fillVideogameByPlatformList()) : ps5Option.checked = false;
      xboxOneOption.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      xboxSeriesSXOption.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      nintendoSwitch5Option.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      pcOption.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      allPlatformsOption.checked ? dispatch(fillVideogameByPlatformList()) : console.log('hola');
      target.checked ? dispatch(filterVideogameBySale(target.value)) : dispatch(fillVideogameBySaleList());

    }

    return (
        <>
            <div className="filter__button" id="filter__button-id" onClick={() => handleInputNav()}>
                <p className="filter__tag" id="filter__tag__open-id">Filters</p>
                <p className="filter__tag" id="filter__tag__close-id">Close</p>
                <FontAwesomeIcon id="filter__icon__right-id" className="filter__icon" icon="angle-double-right" />
                <FontAwesomeIcon id="filter__icon__left-id" className="filter__icon" icon="angle-double-left" />
            </div>
            <div className="filter__options" id="filter__options-id">
                <p>Platforms:</p>
                <div>
                  <input type="radio" id="allPlatforms" value="allPlatforms" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="allPlatforms">All Platforms</label>
                </div>
                <div>
                  <input type="radio" id="ps4" value="ps4" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="ps4">PlayStation 4</label>
                </div>
                <div>
                  <input type="radio" id="ps5" value="ps5" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="ps5">PlayStation 5</label>
                </div>
                <div>
                  <input type="radio" id="xboxOne" value="xboxOne" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="xboxOne">Xbox One</label>
                </div>
                <div>
                  <input type="radio" id="xboxSeriesSX" value="xboxSeriesSX" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="xboxSeriesSX">Xbox Series S/X</label>
                </div>
                <div>
                  <input type="radio" id="nintendoSwitch" value="nintendoSwitch" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="nintendoSwitch">Nintendo Switch</label>
                </div>
                <div>
                  <input type="radio" id="pc" value="pc" name="platform" onChange={(value) => handleChangeChecked(value)}/>
                  <label for="pc">PC</label>
                </div>
                <p>Prices:</p>
                <div>
                  <input type="radio" id="notSale" value="notSale" name="sales" onChange={(value) => handleChangeSales(value)}/>
                  <label for="notSale">Normal Price</label>
                </div>
                <div>
                  <input type="radio" id="onSale" value="onSale" name="sales" onChange={(value) => handleChangeSales(value)}/>
                  <label for="onSale">On sale</label>
                </div>
            </div>
        </>
    )
}


function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        salesVideogames: videogameReducer.salesVideogames,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

export default connect(mapStateToProps)(FilterComponent);
