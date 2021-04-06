/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import marked from 'marked';

/*import Note from './Note.server';
import NoteList from './NoteList.server';
import EditButton from './EditButton.client';
import SearchField from './SearchField.client';
import NoteSkeleton from './NoteSkeleton';
import NoteListSkeleton from './NoteListSkeleton';*/

export default function App(props) {

  return (
    <div>
      <h3>
        Markdown content rendered on the server
      </h3>
      <div

        dangerouslySetInnerHTML={{
          __html: marked(props.mdText)
        }}>

      </div>
    </div>
  )
}

