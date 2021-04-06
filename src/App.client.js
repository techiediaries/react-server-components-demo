/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useRef, Suspense} from 'react';
import {useServerResponse} from './Cache.client';

const title = 'React Server Components Demo';
 
const RenderedContent = (props) => {
    const response = useServerResponse(props)
    return response.readRoot()
}

export default function App() {
  
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent(contentRef.current.value);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <h2>{title}</h2>
      <form onSubmit={ handleSubmit }>
      <textarea ref = { contentRef }
       name="content"
      >
      </textarea>
      <br />
      <input
       type="submit" value="Convert.."
      />
    </form>
    </div>
    <RenderedContent mdText={content}></RenderedContent>

    </Suspense>
  );
}



