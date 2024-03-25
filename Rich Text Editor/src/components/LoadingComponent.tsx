import './LoadingComponent.css';
import LoadingEgg from '../assets/LoadingEgg.png';

const LoadingComponent = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <img src={LoadingEgg} className="loading-img" alt={"Loading"} />
            <p>PokeMon is Loading...</p>
        </div>
    );
};

export default LoadingComponent;
