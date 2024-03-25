import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { ToolbarPlugin } from '../Toolbar/Toolbar';
import { Pokemon } from '../data/Pokemon';
import { PokemonNode } from '../nodes/PokemonNode';
import { PokemonPlugin } from '../plugins/PokemonPlugin';
import { useEffect, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import './Editor.css';

const theme = {
  heading: {
    h1: 'glyf-editor-h1',
    h2: 'glyf-editor-h2',
    h3: 'glyf-editor-h3'
  },
  text: {
    bold: 'glyf-editor-bold',
    italic: 'glyf-editor-italic',
    underline: 'glyf-editor-underline',
    strikethrough: 'glyf-editor-strikethrough',
    underlineStrikethrough: 'glyf-editor-underlineStrikethrough'
  },
  disply: 'flex'

}

function onError(error: Error): void {
  console.error(error);
}

const Placeholder = () => {
  return (
    <div className="placeholder">
      Hi, Trainer!<br />
      Type in a Pokémon's name and start your adventure! 🚀
    </div>
  );
};

export default function Editor(): JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, PokemonNode]
  };

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Pokémon data on component mount
  useEffect(() => {
    const getPokemons = async () => {
      const urls = Array.from({ length: 151 }, (_, index) => `https://pokeapi.co/api/v2/pokemon/${index + 1}`);
      try {
        const response = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
        const pokemonData: Pokemon[] = response.map(data => (
          { name: data.name, image: data.sprites.front_default }
        ));
        setPokemons(pokemonData)
        setLoading(false); // Set loading to false once data is fetched
        console.log(pokemonData);
      } catch (error) {
        console.error("Failed to fetch Pokémon names:", error);
        setLoading(false); // Also set loading to false in case of an error
      }
    }
    getPokemons();
  }, []);

  // Render the LoadingComponent while data is being fetched
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      {pokemons.length > 0 ?
        <PokemonPlugin data={pokemons} /> : ""
      }
      <ListPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}