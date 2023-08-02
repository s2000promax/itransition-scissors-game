import { NodeModel } from './nodeModel.ts';

export class GameRules {
    constructor(
        public readonly nodes: NodeModel[],
        public readonly adjacencyMatrix: boolean[][],
    ) {}
    public getRandomMove(): string {
        const randomIndex = Math.floor(Math.random() * this.nodes.length);
        return this.nodes[randomIndex].getNodeName();
    }

    public getResult(userMove: string, computerMove: string): string {
        const userMoveNodeIndex = this.nodes.findIndex(
            (node) => node.getNodeName() === userMove,
        );
        const computerMoveNodeIndex = this.nodes.findIndex(
            (node) => node.getNodeName() === computerMove,
        );

        if (userMoveNodeIndex === computerMoveNodeIndex) {
            return 'Draw';
        } else if (
            !this.adjacencyMatrix[userMoveNodeIndex][computerMoveNodeIndex]
        ) {
            return 'You win!';
        } else {
            return 'Computer win!';
        }
    }
}
