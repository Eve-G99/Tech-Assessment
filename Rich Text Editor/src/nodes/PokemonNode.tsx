import {
  type EditorConfig,
  DecoratorNode,
  LexicalNode
} from 'lexical';
import PokemonCard from '../components/PokemonCard';
import { Pokemon } from '../data/Pokemon';

// Create a new PokemonNode
export function $createPokemonNode({ name, image }: Pokemon): PokemonNode {
  return new PokemonNode(name, image);
}

// Type Guard to check if PokemonNode
export function $isPokemonNode(node: LexicalNode): node is PokemonNode {
  return node instanceof PokemonNode;
}

// Custom DecoratorNode for rendering Pokemon data
export class PokemonNode extends DecoratorNode<JSX.Element> {
  __pokemonName: string;
  __pokemonImage: string | undefined;

  // Constructor for creating a new instance of PokemonNode
  constructor(pokemonName: string, pokemonImage: string | undefined, key?: string) {
    super(key);
    this.__pokemonName = pokemonName;
    this.__pokemonImage = pokemonImage;
  }

  static getType(): string {
    return 'pokemon';
  }

  static clone(node: PokemonNode): PokemonNode {
    return new PokemonNode(node.__pokemonName, node.__pokemonImage, node.__key);
  }

  // Method to create the DOM representation of the node
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  // Decorate to render PokemonCard component
  decorate(): JSX.Element {
    return (
      <PokemonCard
        name={this.__pokemonName}
        url={this.__pokemonImage}
      />
    );
  }
}