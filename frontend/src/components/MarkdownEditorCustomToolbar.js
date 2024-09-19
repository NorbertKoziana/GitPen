import React from "react";
import { ICommand } from "@uiw/react-markdown-editor";

const collapsible: ICommand = {
    name: "collapsible",
    keyCommand: "collapsible",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="-6.5 0 32 32" version="1.1">
      <title>dropdown</title>
      <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"/>
      </svg>
    ),
    execute: ({ state, view }) => {
      if (!state || !view) return;

      const dropdown = 
`<details>
  <summary>Markdown</summary>

-  <kbd>[Markdown Editor](https://binarytree.dev/me)</kbd>
-  <kbd>[Table Of Content](https://binarytree.dev/toc)</kbd>
-  <kbd>[Markdown Table Generator](https://binarytree.dev/md_table_generator)</kbd>

</details>`;

      const line = view.state.selection.main

      view.dispatch({
        changes: {
          from: line.from,
          to: line.to,
          insert: dropdown
        },
        selection: { anchor: line.from + dropdown.length }
      });
    }
  };

  const table: ICommand = {
    name: "table",
    keyCommand: "table",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
      <path d="M10 17H9.2C8.07989 17 7.51984 17 7.09202 16.782C6.71569 16.5903 6.40973 16.2843 6.21799 15.908C6 15.4802 6 14.9201 6 13.8V11C6 11.9319 6 12.3978 6.15224 12.7654C6.35523 13.2554 6.74458 13.6448 7.23463 13.8478C7.60218 14 8.06812 14 9 14M3 8H21M12 11H18M13 14H18M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    execute: ({ state, view }) => {
      if (!state || !view) return;

      const table = 
`<table>
<tr>
<th>Heading 1</th>
<th>Heading 2</th>
</tr>
<tr>

<td>

| A | B | C |
|--|--|--|
| 1 | 2 | 3 |

</td><td>

| A | B | C |
|--|--|--|
| 1 | 2 | 3 |

</td></tr> 
</table>`;

      const line = view.state.selection.main

      view.dispatch({
        changes: {
          from: line.from,
          to: line.to,
          insert: table
        },
        selection: { anchor: line.from + table.length }
      });
    }
  };
  
  export {
    collapsible,
    table
  }
