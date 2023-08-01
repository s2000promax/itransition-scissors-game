import { NodeModel } from './nodeModel.ts';

export class GameRules {
  public getRandomMove(nodes: NodeModel[]): string {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex].getNodeName();
  }

  public getResult(userMove: NodeModel, computerMove: NodeModel): string {
    if (userMove.beats(computerMove)) {
      return 'You win!';
    } else if (computerMove.beats(userMove)) {
      return 'Computer win!';
    } else {
      return 'Draw!';
    }
  }
}
