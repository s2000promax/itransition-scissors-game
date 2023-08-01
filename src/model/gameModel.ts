import { NodeModel } from './nodeModel.ts';

export class GameModel {
  public readonly nodes: NodeModel[];

  constructor(public readonly names: string[]) {
    this.nodes = names.map((name) => new NodeModel(name));
    this.buildGraph();
  }

  private buildGraph(): void {
    const totalNodes = this.nodes.length;
    const halfTotalNodes = Math.floor(totalNodes / 2);

    for (let i = 0; i < totalNodes; i++) {
      const currentNode = this.nodes[i];
      for (let j = 1; j <= halfTotalNodes; j++) {
        const otherNodeIndex = (i + j) % totalNodes;
        const otherNode = this.nodes[otherNodeIndex];

        currentNode.addConnection(otherNode, true);
        otherNode.addConnection(currentNode, false);
      }
    }
  }

  public findNode(move: string): NodeModel {
    const node = this.nodes.find((n) => n.name === move);
    if (!node) {
      throw new Error(`Invalid move: ${move}`);
    }
    return node;
  }
}
