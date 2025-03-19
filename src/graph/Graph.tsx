import Drawflow from 'drawflow';
import 'beautiful-react-diagrams/styles.css';
 
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { DiagramSchema } from 'beautiful-react-diagrams/@types/DiagramSchema';

// the diagram model
const initialSchema:DiagramSchema<unknown> = createSchema({
  nodes: [
    { id: 'node-1', content: 'Node 1', coordinates: [250, 60], },
    { id: 'node-2', content: 'Node 2', coordinates: [100, 200], },
    { id: 'node-3', content: 'Node 3', coordinates: [250, 220], },
    { id: 'node-4', content: 'Node 4', coordinates: [400, 200], },
  ],
  links: [
    { input: 'node-1',  output: 'node-2' },
    { input: 'node-1',  output: 'node-3' },
    { input: 'node-1',  output: 'node-4' },
  ]
});

// function App() {
//   return (
//     <BrowserRouter>
//       <header className="sticky">
//         <NavLink to="/" className="button rounded
//     </BrowserRouter>
//   );
// }
// function Graph () {
//   // create diagrams schema
//   const [schema, { onChange }] = useSchema(initialSchema);

//   return (
//     <div>
//       <Diagram schema={schema} onChange={onChange} />
//     </div>
//   );
// };

 
 
// export default Graph;

const Graph = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);
  console.log(schema)
  return (
    <div style={{ height: '22.5rem', width: '22.5rem'}}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default Graph ;