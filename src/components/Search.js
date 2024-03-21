import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeTextInput, filterData, initialCurrentPage } from '../store/store';

function Search() {
    const textInput = useSelector(state => state.textInput);
    const dispatch = useDispatch();

    const handleTextInput = (e) => {
        dispatch(changeTextInput(e.target.value));
    }

    const handleFilterData = () => {
        dispatch(filterData(textInput));
        dispatch(initialCurrentPage());
    }

    return (
        <div className="search-bar">
            <input className="input-form" placeholder='검색어를 입력해주세요.' onChange={handleTextInput} value={textInput} />
            <FontAwesomeIcon onClick={handleFilterData} icon={faSearch} style={{fontSize: '1.6rem', padding: '0.2rem', color:'#3aad6d', cursor: 'pointer'}}/>
        </div>
    )
}

export default Search;