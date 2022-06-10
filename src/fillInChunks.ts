import type {ChunkArg} from './typing';

type FillInChunksProps = {
  chunksToHighlight: ChunkArg[];
  totalLength: number;
};

export const fillInChunks = ({ chunksToHighlight, totalLength }: FillInChunksProps): ChunkArg[] => {
  const allChunks: ChunkArg[] = [];

  const append = (start: number, end: number, isHighlight: boolean) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        isHighlight,
      });
    }
  };

  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false);
  } else {
    let lastIndex = 0;

    chunksToHighlight.forEach((chunk) => {
      append(lastIndex, chunk.start, false);
      append(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    append(lastIndex, totalLength, false);
  }

  return allChunks;
};
