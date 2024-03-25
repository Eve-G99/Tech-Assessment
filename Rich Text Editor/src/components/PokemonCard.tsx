import './PokemonCard.css';

const PokemonCard = ({ name, url }: { name: string, url: string | undefined }): JSX.Element => {
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div className="pokemon-item">
            <div className="pokemon-name"><span>{displayName}</span></div>
            <img src={url} alt={name} />
        </div>
    );
};

export default PokemonCard;
