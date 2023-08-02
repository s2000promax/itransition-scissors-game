import { NodeModel } from './nodeModel.ts';

export class GameModel {
    private nodes: NodeModel[] = [];
    private adjacencyMatrix: boolean[][] = [];

    constructor(public readonly moves: string[]) {
        this.buildAdjacencyMatrixForIntransitive(moves);
    }

    private buildAdjacencyMatrixForIntransitive(moves: string[]): void {
        const length = moves.length;
        this.nodes = moves.map((move) => new NodeModel(move));

        this.adjacencyMatrix = this.nodes.map(() =>
            this.nodes.map(() => false),
        );

        const step = (length - 1) / 2;

        for (let i = 0; i < length; i += 1) {
            for (let j = 1; j <= step; j += 1) {
                this.adjacencyMatrix[i][(i + j) % length] = true;
            }
        }
    }

    private buildAdjacencyMatrixForClassical(moves: string[]): void {
        const length = moves.length;
        this.nodes = moves.map((move) => new NodeModel(move));
        this.adjacencyMatrix = this.nodes.map((_, i) =>
            this.nodes.map(
                (_, j) =>
                    (j - i + length) % length <= (length - 1) / 2 && i !== j,
            ),
        );
    }

    public getNodes(): NodeModel[] {
        return this.nodes;
    }

    public getAdjacencyMatrix(): boolean[][] {
        return this.adjacencyMatrix;
    }
}
