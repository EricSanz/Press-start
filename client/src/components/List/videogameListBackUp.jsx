/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchComponent from '../Search/Search';
import FilterComponent from '../Filter/Filter';
import { loadVideogames } from '../../redux/actions/videogameActions';
import Card from './Card/Card';
import './VideogamesList.scss';

function VideogameList({ videogamesList, dispatch, loading, error, filteredVideogameList, platformVideogamesList, salesVideogamesList }) {

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
    const allPlatformsChecked = document.getElementById('allPlatforms');
    const notSaleChecked = document.getElementById('notSale');
    const onSaleChecked = document.getElementById('onSale');

    const displayVideogameList = (
        <>
            {/* {!filteredVideogameList?.length && !platformVideogamesList?.length && !salesVideogamesList?.length && videogamesList?.length && videogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}

            {!filteredVideogameList?.length && !platformVideogamesList?.length && videogamesList?.length && videogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))}

            {filteredVideogameList?.length > 0 && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                // <Card Games={videogame} />
                videogame.ps4 ? <Card Games={videogame}/> : null
            ))}

            {/* {filteredVideogameList?.length > 0 && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.ps4 ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && platformVideogamesList?.length && salesVideogamesList?.length && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.ps4 ? <Card Games={videogame}/> : null
            ))} */}

            {/* {filteredVideogameList?.length > 0 && ps5Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.ps5 ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && xboxOneChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.xboxOne ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && xboxSeriesSXChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.xboxSeriesSX ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && nintendoSwitchChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.nintendoSwitch ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && pcChecked.checked && filteredVideogameList.map((videogame) => (
                videogame.pc ? <Card Games={videogame}/> : null
            ))}

            {filteredVideogameList?.length > 0 && allPlatformsChecked.checked && filteredVideogameList.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}
            {/* ESTOS DE ARRIBA */}

            {/* {filteredVideogameList?.length > 0 && filteredVideogameList.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}

            {/* {filteredVideogameList?.length > 0 && salesVideogamesList?.length > 0 && onSaleChecked.checked && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.edition.sale ? <Card Games={videogame}/> : null
                <Card Games={videogame}/>
            ))} */}

            {/* {filteredVideogameList?.length > 0 && ps4Checked.checked && filteredVideogameList.map((videogame) => (
                videogame.edition.sale ? <Card Games={videogame}/> : null
            ))} */}

            {/* {salesVideogamesList?.length > 0 && !filteredVideogameList?.length && salesVideogamesList.map((videogame) => (
                videogame.edition.sale ? <Card Games={videogame}/> : null  
            ))} */}
            {/* ESTE DE ARRIBA */}

{/* !platformVideogamesList?.length && !filteredVideogameList?.length && ps4Checked.checked &&  */}

            {/* {salesVideogamesList?.length > 0 && !filteredVideogameList?.length && salesVideogamesList.map((videogame) => (
                <Card Games={videogame}/>
                videogame.edition.sale ? <Card Games={videogame}/> : null
            ))} */}
            
            {/* {salesVideogames?.length > 0 && onSaleChecked.checked && ps4Checked.checked && salesVideogames.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}

            {/* {salesVideogames?.length > 0 && onSaleChecked.checked && ps5Checked.checked && salesVideogames.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}

            {/* {filteredVideogameList?.length > 0 && !platformVideogamesList?.length && !salesVideogamesList?.length && filteredVideogameList.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}
            {/* ESTE DE ARRIBA */}

            {/* {platformVideogamesList?.length > 0 && !filteredVideogameList?.length && platformVideogamesList.map((videogame) => (
                <Card Games={videogame}/>
            ))} */}
            {/* ESTE DE ARRIBA */}

            {/* {platformVideogamesList?.length > 0 && !filteredVideogameList?.length && ps4Checked.checked && platformVideogamesList.map((videogame) => (
                <Card Games={videogame} />
            ))} */}
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
        platformVideogamesList: videogameReducer.platformVideogamesList,
        salesVideogamesList: videogameReducer.salesVideogamesList,
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