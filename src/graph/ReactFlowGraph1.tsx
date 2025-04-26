import { useCallback, useEffect, useState } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  useReactFlow
} from '@xyflow/react';
import {Graph,GraphNode, NodeData} from './GraphObjects';
import '@xyflow/react/dist/style.css';
import { MOCK_GRAPH, STARTER_GRAPH } from './MockGraph'; 
import Api from '../Api';
import { useParams } from 'react-router-dom';

let nextNodeId = 5;

function randomXY() { // min and max included 
  return Math.floor(Math.random() * 500 + 1); 
}


function MyComponent() {
  const [data, setData] = useState<Graph >(STARTER_GRAPH);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = useParams();
      if (id == undefined){ 
        setData(STARTER_GRAPH);
      }
      else {
        try {
        const result = await Api.getWorkflow(id); 
        setData(result);
        }
       catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Render your UI using the 'data' */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
 


// // usage

//   const submitHandler = (form: NewInvite): void => {
//     if (orgId !== undefined) {
//       // must have a valid org ID to post
//       void UserApi.createInvite({
//         email: form.email,
//         firstName: form.firstName,
//         lastName: form.lastName,
//         organizationId: orgId,
//         roleId: parseRoleString(form.orgRole),
//       }).then((res) => {
//         if (res.ok) {
//           notifyCreationSuccess(
//             DOMAIN_INVITE,
//             `for ${form.firstName} ${form.lastName}`
//           );
//           navigate("/organization/users");
//         } else {
//           void UserApi.getErrorMsg(res).then(([status, error]) => {
//             notifyCreationFailed(
//               DOMAIN_INVITE,
//               `for ${form.firstName} ${form.lastName}`,
//               errorStatusMessage(status, error)
//             );
//           });
//         }
//       });
//     } else {
//       alert("Internal site error. Please re-login to continue.");
//     }





function Flow() {
  // you can access the internal state here
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(MOCK_GRAPH.nodes.map(n => n.asDisplayable(randomXY(), randomXY())));
  const [edges, setEdges, onEdgesChange] = useEdgesState(MOCK_GRAPH.edges);
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    [],
  );
 
  
  const addNode = () => {
    console.log("Adding node");
    const id = `${++nextNodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 50,
        y: Math.random() * 50,
      },
      data: {
        label: `Node ${id}`,
      },
    };

    reactFlowInstance.addNodes(newNode);
  }

  const sendGraph = () => {
    console.log(nodes);
    console.log(edges);

  } 
  return <div style={{ height: 800, width: 800 }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
    >

      <Controls />
      <Background />
    </ReactFlow>
    <button onClick={() => addNode()} className="btn-add">
      add a node
    </button>
    <button onClick={() => sendGraph()} className="btn-add">
      add a node
    </button>
  </div>


};

// wrapping with ReactFlowProvider is done outside of the component
function ProviderFlow1() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}


export default ProviderFlow1;




