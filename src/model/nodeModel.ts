export class NodeModel {
  private connections: Map<NodeModel, boolean> = new Map();

  constructor(public readonly name: string) {}

  addConnection(node: NodeModel, beats: boolean): void {
    this.connections.set(node, beats);
  }

  beats(node: NodeModel): boolean {
    return this.connections.get(node)!;
  }

  getNodeName(): string {
    return this.name;
  }
}
