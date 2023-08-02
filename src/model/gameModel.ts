import { NodeModel } from './nodeModel.ts';

export class GameModel {
  private nodes: NodeModel[] = [];
  private adjacencyMatrix: boolean[][] = [];

  constructor(public readonly moves: string[]) {
    this.buildGraph(moves);
  }

  private buildGraph(moves: string[]): void {
    const length = moves.length;
    this.nodes = moves.map(move => new NodeModel(move));
    this.adjacencyMatrix = this.nodes
      .map((_, i) => this.nodes
        .map((_, j) => (j - i + length) % length <= (length - 1) / 2 && i !== j));
    console.log(this.nodes)
    console.log(this.adjacencyMatrix);
  }

  public getNodes(): NodeModel[] {
    return this.nodes;
  }

  public getAdjacencyMatrix(): boolean[][] {
    return this.adjacencyMatrix;
  }
}
