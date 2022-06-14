# Highlight-multiple-words


## API

The Highlight-multiple-words provide a function as `findAll`. This function searches a string of text for a set of search terms and returns an array of "ChunkArg" that describe the matches found.

`Note` - If searchWords has duplicate child or empty string it will automatically discard For Example
         <br/>1. ["Avinash","Dummy","Avinash"] = ["Avinash","Dummy"] 
         <br/>2. [' '] = [ ] 

It returns `Array<ChunkArg>`. It consists `start(number), end(number) and isHighlight(boolean)`. `isHighlight` is true when a chunk is a match else false. For Example:


         

```typescript jsx
import "./styles.css";

import { findAll } from "highlight-multiple-words";
import type { ChunkArg, FindChunksArg } from "highlight-multiple-words";

export default function App() {
  const textToHighlight = "Lorem Ipsum is simply dummy text.";
  const searchWords = ["Lorem Ipsum", "dummy"];
  
  //const textToHighlight = "लोरेम इप्सम प्रिंटिंग और टाइपसेटिंग उद्योग का केवल डमी टेक्स्ट है।";
  //const searchWords = ["लोरेम इप्सम", "डमी"];
  
  const chunks: ChunkArg[] = findAll({
    searchWords,
    textToHighlight
  });

  return (
    <div className="App">
      {chunks.map((chunk, index) => {
          const text: string = textToHighlight.substr(
            chunk.start,
            chunk.end - chunk.start
          );
          return chunk.isHighlight ? (
              <span key={text} style={{ color: "red" /* highlight style */}}>
                {text}
              </span>
            ) : (
              <span key={text}>{text}</span>
            );
        })}
      </div>
  );
}

```

[Run this example on Code Sandbox.](https://codesandbox.io/s/highlight-multiple-words-yuqe4t)

### `findAll`

The `findAll` function accepts several parameters, although only the `searchWords` array and `textToHighlight` string are required.

| Parameter | Required? | Type       | Default Value | Description                                |
| --- |:---------:|------------|---------------|----------------------------------|
| autoEscape |           | `boolean`  |  | Escape special regular expression characters |
| caseSensitive |           | `boolean`  | false         | Search should be case sensitive            |
| findChunks |           | `Function` |  | Custom find function (advanced)            |
| sanitize |           | `Function` |  | Custom sanitize function (advanced)        |
| searchWords |   true    | `string[]` |  | Array of words(string) to search for       |
| textToHighlight |   true    | `string`   |  | Text to search and highlight               |

<br/>
<br/>

### `findAll Response`

The `findAll` return `Array<ChunkArg>`

| Key         | type      |
|-------------|-----------|
| start       | `number`  |
| end         | `number`  |
| isHighlight | `boolean` |




