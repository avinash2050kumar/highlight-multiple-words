import type { ChunkArg } from './typing';

export const combineChunks = ({ chunks }: { chunks: ChunkArg[] }): ChunkArg[] => {
  return chunks
    .sort((first, second) => first.start - second.start)
    .reduce((tempChunks: ChunkArg[], nextItem) => {
      if (tempChunks.length === 0) {
        return [nextItem];
      } else {
        const prevItem = tempChunks.pop();
        if (prevItem && nextItem.start <= prevItem.end) {
          const endIndex = Math.max(prevItem.end, nextItem.end);
          tempChunks.push({
            isHighlight: false,
            start: prevItem.start,
            end: endIndex,
          });
        } else if (prevItem && nextItem) {
          tempChunks.push(prevItem, nextItem);
        }
        return tempChunks;
      }
    }, []);
};
