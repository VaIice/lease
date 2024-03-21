import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
import { changeCurrentPage } from '../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import Modal from '../components/Modal';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Table() {
    const currentPage = useSelector(state => state.currentPage);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();
    const [clickNumber, setClickNumber] = useState(null);
    const [modalState, setModalState] = useState(false);
    const handleCurrentPage = (page) => {
        dispatch(changeCurrentPage(page));
    }
    
    return (
        <>   
        {
                modalState && <Modal setModalState={setModalState} data={data[clickNumber]} />
        }
            <table className="table-box">
                <tbody>
                    {data.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 6).map((record, index) => (
                        <tr key={index}>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="table-in-box">
                                    <span className="name">{record.사업소명}</span>
                                    <span className="address">{record.소재지도로명주소.split(" ").slice(0, 3).join(" ")}</span>
                                </div>
                                <div className="table-in-box">
                                    <button className="see-more-button" onClick={async () => {
                                        setModalState(true);
                                        setClickNumber((currentPage - 1) * 10 + index);
                                    }}>더보기</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={data.length}
                pageRangeDisplayed={5}
                onChange={handleCurrentPage}
                prevPageText={<FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '0.8rem', marginBottom: '1px', color: '#9aa0a6'}} />}
                nextPageText={<FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.8rem', marginBottom: '1px', color: '#9aa0a6'}} />}
                firstPageText={<FontAwesomeIcon icon={faAnglesLeft} style={{ fontSize: '0.8rem', marginBottom: '1px', color: '#9aa0a6'}} />}
                lastPageText={<FontAwesomeIcon icon={faAnglesRight} style={{ fontSize: '0.8rem', marginBottom: '1px', color: '#9aa0a6'}} />}
            />
        </>
    )
}

export default Table;