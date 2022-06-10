import { ChunkArg, FindChunksArg } from './typing';
import { escapeRegExpFn } from './utils/regex';
import { defaultSanitize } from './utils/string';

export const findChunks = ({
  autoEscape,
  caseSensitive,
  sanitize = defaultSanitize,
  searchWords,
  textToHighlight,
}: FindChunksArg): ChunkArg[] => {
  textToHighlight = sanitize(textToHighlight);

  /* Remove duplicate item
     Remove empty string */
  return searchWords
    .filter((item, index) => searchWords.indexOf(item) === index)
    .filter((searchWord) => searchWord)
    .reduce((chunks: ChunkArg[], searchWord) => {
      searchWord = sanitize(searchWord);

      if (autoEscape) {
        searchWord = escapeRegExpFn(searchWord);
      }

      const flag = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(searchWord, flag);

      let match;
      // tslint:disable-next-line
      while ((match = regex.exec(textToHighlight))) {
        const start = match.index;
        const end = regex.lastIndex;
        if (end > start) {
          chunks.push({ start, end, isHighlight: false });
        }

        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }

      return chunks;
    }, []);
};
