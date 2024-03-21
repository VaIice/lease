import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Modal from '../components/Modal';

const { kakao } = window;

function Map() {
    const data = useSelector(state => state.data);
    const currentPage = useSelector(state => state.currentPage);
    const [clickNumber, setClickNumber] = useState(null);
    const [modalState, setModalState] = useState(false);
    const mapRef = useRef(null);
    const markers = useRef([]);
    const overlays = useRef([]);
    const openOverlays = useRef([false, false, false, false, false, false]);
    const prevCurrentPage = useRef(1);
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    overlays.current.forEach(overlay => overlay.setMap(null));
    overlays.current = [];

    useEffect(() => {
        if (!mapRef.current) {
            const container = document.getElementById('map');
                        const options = {
                center: new kakao.maps.LatLng(data[0].위도, data[0].경도),
                level: 9
            };
            const map = new kakao.maps.Map(container, options);
            mapRef.current = map;
        }
        
        const positions = [];
        data.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 6).forEach((record, index) => {
            let title = record.사업소명;
            if (title.length > 17) {
                title = title.substr(0, 16) + '...';
            }
            const content = `<div class="wrap">
                                <div class="info">
                                    <div class="title">
                                        ${title}
                                        <div class="close" title="닫기"></div>
                                    </div>
                                    <div class="body">
                                        <div class="desc" style="margin: 13px 0px 0px 13px">
                                            <div class="ellipsis">${record.소재지도로명주소}</div>
                                            <div class="jibun ellipsis">(지번)${record.소재지지번주소}</div>
                                            <div class="tel">${record.사업소전화번호}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            positions.push({
                content,
                latlng: new kakao.maps.LatLng(record.위도, record.경도),
            });
        });

        if (currentPage !== prevCurrentPage.current) {
            let isCenter = false;
            for (let i = 0; i < 6; i++) {
                if (data[(currentPage - 1) * 10 + i].위도 && data[(currentPage - 1) * 10 + i].경도) {
                    mapRef.current.setCenter(new kakao.maps.LatLng(data[(currentPage - 1) * 10 + i].위도, data[(currentPage - 1) * 10 + i].경도));
                    isCenter = true;
                    break;
                }
            }
            if (!isCenter) {
                mapRef.current.setCenter(new kakao.maps.LatLng(37.55, 126.99));
            }
            openOverlays.current = [false, false, false, false, false, false];
        }     
        
        prevCurrentPage.current = currentPage;        

        for (let i = 0; i < positions.length; i++) {
            console.log('생성!');
            const content = document.createElement('div');
            content.innerHTML = positions[i].content;

            const marker = new kakao.maps.Marker({
                map: mapRef.current, 
                position: positions[i].latlng 
            });

            kakao.maps.event.addListener(marker, 'mouseover', function () {
                marker.setZIndex(9999);
            });         
            
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                marker.setZIndex(0);
            });    

            markers.current.push(marker);

            const overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: null,
                position: positions[i].latlng
            });

            if (openOverlays.current[i]) {
                overlay.setMap(mapRef.current);
                openOverlays.current[i] = true;
            }

            overlays.current.push(overlay);

            overlay.setZIndex(marker.getZIndex() + 10);

            kakao.maps.event.addListener(marker, 'click', function () {
                if (overlay.getMap()) {
                    overlay.setMap(null);
                    openOverlays.current[i] = false;
                }
                else {
                    overlay.setMap(mapRef.current);
                    openOverlays.current[i] = true;
                }
            });
            
            content.querySelector('.close').addEventListener('click', function (e) {
                e.stopPropagation()
                overlay.setMap(null);
                openOverlays.current[i] = false;
            });     
            
            content.addEventListener('click', function () {
                setClickNumber(() => (currentPage - 1) * 10 + i);
                setModalState(true);
            });
        }
    }, [currentPage, data, modalState]);
    
    return (
        <>
            {
                modalState && <Modal setModalState={setModalState} data={data[clickNumber]} />
            }
            <div id="map" className="map-box"></div>
        </>
    );
}

export default Map;