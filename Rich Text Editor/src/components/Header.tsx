import './Header.css';
import Logo from '../assets/Logo.png';

const Header = () => {
    return (
        <header className="headerContainer">
            <img src={Logo} alt="Pokemon Logo" className="logo" />
            <h1 className="headerText">Pokédex</h1>
        </header>
    )
};

export default Header;

