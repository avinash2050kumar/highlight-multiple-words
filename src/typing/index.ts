import { defaultSanitize } from '../utils/string';

export type ChunkArg = {
  isHighlight: boolean;
  start: number;
  end: number;
};

export type FindChunksArg = {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  searchWords: string[];
  textToHighlight: string;
  sanitize?: typeof defaultSanitize;
};
