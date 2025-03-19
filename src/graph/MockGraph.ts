import {GraphEdge, GraphNode as GraphNode, NodeData, Graph} from './GraphObjects';


export const STARTER_GRAPH: Graph = {
  nodes: [
    new GraphNode({
      id: '1',
      data: new NodeData({label:'1'})
    }),
  ],
    edges: []
}
export const MOCK_GRAPH:Graph = { 
  
  nodes: [
  new GraphNode({
    id: '1',
    data: new NodeData({label:'1'})
  }),
  new GraphNode({
    id: '2',
    data: new NodeData({label:'2'})
  }),
  new GraphNode({
    id: '3',
    data: new NodeData({label:'3'})
  }),
  new GraphNode({
    id: '4',
    data: new NodeData({label:'4'})
  }), ],

  edges: [
    new GraphEdge({id: '1e', source:'1', target:'2', animated:true}),
    new GraphEdge({id: '2e', source:'1', target:'3', animated:true}),
    new GraphEdge({id: '3e', source:'3', target:'4', animated:false}),  
  ]

}
