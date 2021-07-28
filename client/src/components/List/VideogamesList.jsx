/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchComponent from '../Search/Search';
import FilterComponent from '../Filter/Filter';
import { loadVideogames } from '../../redux/actions/videogameActions';
import Card from './Card/Card';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error, filteredVideogameList, platformVideogames}) {

    useEffect(() => {
        if (!videogamesList?.length) {
            dispatch(loadVideogames());
        }
    }, [videogamesList?.length]);

    const ps4Checked = document.getElementById('ps4');
    const ps5Checked = document.getElementById('ps5');
    const xboxOneChecked = document.getElementById('xboxOne');
    const xboxSeriesSXChecked = document.getElementById('xboxSeriesSX');
    const nintendoSwitchChecked = document.getElementById('nintendoSwitch');
    const pcChecked = document.getElementById('pc');

    const displayVideogameList = (

        <>
            {!filteredVideogameList?.length && !platformVideogames?.length && videogamesList?.length && videogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.ps4 ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && ps5Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.ps5 ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && xboxOneChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.xboxOne ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && xboxSeriesSXChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.xboxSeriesSX ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && nintendoSwitchChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.nintendoSwitch ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogames && pcChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.pc ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && !platformVideogames?.length && filteredVideogameList.map((videogame) => (
                <Card Games={videogame}/>
            ))}

            {platformVideogames?.length > 0 && !filteredVideogameList?.length && platformVideogames.map((videogame) => (
                <Card Games={videogame} />
            ))}
        </>
    )

    const notExist = (
        <>
            {filteredVideogameList?.length === 0 && <h3 className="notExist">A videogame with that name does not exist</h3>}
        </>
    )

    return (
        <div className={loading ? "list__loading" : "list__container"} id="list__container-id">
            {loading ? null : <SearchComponent />}
            {loading ? null : <FilterComponent />}
            {error && <h3 className="noup">There has been an error loading the videogames, sorry and try again later.</h3>}
            {filteredVideogameList?.length < 1 && notExist}
            {loading ? <Loading /> : videogamesList?.length > 0 && displayVideogameList }
        </div>
    )
}

function mapStateToProps({ videogameReducer }) {
    return {
        videogamesList: videogameReducer.videogamesList,
        filteredVideogameList: videogameReducer.filteredVideogameList,
        platformVideogames: videogameReducer.platformVideogames,
        loading: videogameReducer.loading,
        error: videogameReducer.error,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators({
//             requestVideogames,
//         }, dispatch),
//     };
// }

export default connect(mapStateToProps)(VideogameList);