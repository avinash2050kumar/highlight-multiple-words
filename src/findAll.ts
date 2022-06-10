import type { ChunkArg, FindChunksArg } from './typing';
import { fillInChunks } from './fillInChunks';
import { findChunks as tempChunks } from './findChunks';
import { combineChunks } from './combineChunks';

type FindAllProps = FindChunksArg & {
  findChunks?: typeof tempChunks;
};

export const findAll = ({
  autoEscape,
  caseSensitive = false,
  findChunks = tempChunks,
  sanitize,
  searchWords,
  textToHighlight,
}: FindAllProps): ChunkArg[] =>
  fillInChunks({
    chunksToHighlight: combineChunks({
      chunks: findChunks({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight,
      }),
    }),
    totalLength: textToHighlight ? textToHighlight.length : 0,
  });
