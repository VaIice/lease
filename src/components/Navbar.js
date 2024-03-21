import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const clickLogo = () => {
        navigate('/');
        window.location.replace("/")
    }

    return (
        <div>
            <img className="logo" src="/logo.png" alt="Navigation Icon" onClick={clickLogo} />
        </div>
    )
}

export default Navbar;