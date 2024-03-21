function Modal({setModalState, data}) {
    const searchMapTo = () => {
        window.open(`https://map.kakao.com/link/to/${data.사업소명},${data.위도},${data.경도}`);
    }

    const searchMapFrom = () => {
        window.open(`https://map.kakao.com/link/From/${data.사업소명},${data.위도},${data.경도}`);
    }

        return (
            <div className="modal-background">
                <div className="modal-container">
                    <div className="title">{data.사업소명}</div>
                    <button className='map-button' onClick={searchMapFrom}>
                        <i className="start-icon fa-regular fa-circle"></i>
                        <span> 출발</span></button>
                    <button className='map-button' onClick={searchMapTo}>
                        <i className="fa-solid fa-location-dot"></i>
                        <span> 도착</span></button>
                    <table className="modal-box">
                        <tbody>
                            <tr>
                                <th>사업소전화번호</th>
                                <td>{data.사업소전화번호}</td>
                            </tr>
                            <tr>
                                <th>소재지도로명주소</th>
                                <td>{data.소재지도로명주소}</td>
                            </tr>
                            <tr>
                                <th>소재지지번주소</th>
                                <td>{data.소재지지번주소}</td>
                            </tr>
                            <tr>
                                <th>트랙터및작업기보유대수</th>
                                <td>{data.트랙터및작업기보유대수}</td>
                            </tr>
                            <tr>
                                <th>경운기및작업기보유대수</th>
                                <td>{data.경운기및작업기보유대수}</td>
                            </tr>
                            <tr>
                                <th>관리기및작업기보유대수</th>
                                <td>{data.관리기및작업기보유대수}</td>
                            </tr>
                            <tr>
                                <th>땅속작물수확기보유대수</th>
                                <td>{data.땅속작물수확기보유대수}</td>
                            </tr>
                            <tr>
                                <th>탈곡기및정선작업기보유대수</th>
                                <td>{data.탈곡기및정선작업기보유대수}</td>
                            </tr>
                            <tr>
                                <th>자주형파종기보유대수</th>
                                <td>{data.자주형파종기보유대수}</td>
                            </tr>
                            <tr>
                                <th>이앙작업기보유대수</th>
                                <td>{data.이앙작업기보유대수}</td>
                            </tr>
                            <tr>
                                <th>벼수확및운반작업기보유대수</th>
                                <td>{data.벼수확및운반작업기보유대수}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => { setModalState(false); console.log('닫기') }} className='close-button'>닫기</button>
                    </div>
                </div>
        )
}

export default Modal;