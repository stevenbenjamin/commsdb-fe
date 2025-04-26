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
import '@xyflow/react/dist/style.css';
import { STARTER_GRAPH } from './MockGraph';
import Api from '../Api';
import { useParams } from 'react-router-dom'; 
let nextNodeId = 5;

function randomXY() { // min and max included 
  return Math.floor(Math.random() * 500 + 1);
}


function Flow() {
  // you can access the internal state here
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(STARTER_GRAPH.nodes.map(n => n.asDisplayable(100, 100)));
  const [edges, setEdges, onEdgesChange] = useEdgesState(STARTER_GRAPH.edges);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { id } = useParams<'id'>();
  useEffect(() => {
    const fetchData = async () => {
      //console.log("fetch");
      if (id != undefined) {
        try {
          const graph = await Api.getWorkflow('' + id);
          console.log(graph);
          setNodes(graph.nodes.map(n => n.asDisplayable(randomXY(), randomXY())));
          setEdges(graph.edges);
        }
        catch (err) {
          setError(err);
        } 
      }
      else { 
        setNodes(STARTER_GRAPH.nodes.map(n => n.asDisplayable(randomXY(), randomXY())));//STARTER_GRAPH.nodes.map(n => n.asDisplayable(100, 100)));
        setEdges(STARTER_GRAPH.edges);
      }
      setLoading(false);
    };
    fetchData();
  }, []); 


  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    [],
  );
  const addNode = () => {
    //console.log("add node");
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
    console.log("ADDDING NODE"+ `${newNode}`)
    reactFlowInstance.addNodes(newNode);
    ///console.log(reactFlowInstance.getNodes());  

  }

  const sendGraph = () => {
    //console.log("send");
    console.log(nodes);
    console.log(edges);

  }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
function ProviderFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}


export default ProviderFlow;





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

