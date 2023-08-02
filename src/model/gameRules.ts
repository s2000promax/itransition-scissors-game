import { NodeModel } from './nodeModel.ts';

export class GameRules {
  // private readonly nodes: NodeModel[];
  // private readonly adjacencyMatrix: boolean[][];

  constructor(
    public readonly nodes: NodeModel[],
    public readonly adjacencyMatrix: boolean[][],
  ) {
    // this.nodes = nodes;
    // this.adjacencyMatrix = adjacencyMatrix;
  }
  public getRandomMove(nodes: NodeModel[]): string {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex].getNodeName();
  }

  public getResult(userMove: string, computerMove: string): string {
    const userMoveNodeIndex = this.nodes.findIndex(node => node.getNodeName() === userMove);
    const computerMoveNodeIndex = this.nodes.findIndex(node => node.getNodeName() === computerMove);

    if (userMoveNodeIndex === computerMoveNodeIndex) {
      return 'Draw';
    } else if (this.adjacencyMatrix[userMoveNodeIndex][computerMoveNodeIndex]) {
      return 'You win!';
    } else {
      return 'Computer win!';
    }
  }
}
