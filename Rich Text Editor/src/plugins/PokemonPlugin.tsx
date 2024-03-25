import {
  COMMAND_PRIORITY_LOW,
  createCommand,
  $getSelection,
  $isRangeSelection,
  $insertNodes,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PokemonNode, $createPokemonNode } from '../nodes/PokemonNode'
import { Pokemon } from '../data/Pokemon';
import DefaultPic from '../assets/Default.png';

// Define custom commands for inserting and searching Pokémon.
export const INSERT_POKEMON_COMMAND = createCommand('INSERT_POKEMAN_COMMAND');
export const SEARCH_POKEMON_COMMAND = createCommand('SEARCH_POKEMON_COMMAND');

// PokemonPlugin component to add Pokémon functionality to the Lexical editor
export function PokemonPlugin({ data }: { data: Pokemon[] }): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  // Utility function to find a Pokémon by name
  const filterIt = (searchKey: string) => {
    for (const num of data) {
      if (num.name == searchKey) {
        return num
      }
    }
    return undefined
  }

  // Ensure PokemonNode is registered in the editor to avoid runtime errors.
  if (!editor.hasNodes([PokemonNode])) {
    throw new Error('PokenPlugin: PokemonNode not registered on editor');
  }

  // Register command to insert a Pokémon by name
  editor.registerCommand(
    INSERT_POKEMON_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const name = selection.getTextContent() as string;
        if (name.length <= 0) return false;
        const node = $createPokemonNode({ name, image: DefaultPic });
        $insertNodes([node])
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  // Register command to search for a Pokémon by name and add it if found.
  editor.registerCommand(
    SEARCH_POKEMON_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const name = selection.getTextContent() as string;
        const pokemon = filterIt(name)
        if (pokemon !== undefined) {
          const node = $createPokemonNode({ name: pokemon.name, image: pokemon.image });
          $insertNodes([node])
        }
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}