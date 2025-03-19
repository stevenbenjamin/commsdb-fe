
export class GraphEdge {
  id: string = '';
  source: string = '';
  target: string = '';
  animated: boolean = true;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.source) this.source = initializer.source;
    if (initializer.target) this.target = initializer.target;
    if (initializer.animated) this.animated = initializer.animated;
  }
}

export class NodeData {

  label: string = '';
  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.label) this.label = initializer.label;
  }
}

export class GraphNode {
  id: string = '';
  type: string = 'input';
  data: NodeData = new NodeData();
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.data) this.data = initializer.data;
  }

  asDisplayable(x: number, y: number) {
    return {
      id: this.id,
      data: { "label": this.data.label },
      position: { x: x, y: y }
    };
  }
}

export class Graph {
  nodes: GraphNode[] = []
  edges: GraphEdge[] = []
}