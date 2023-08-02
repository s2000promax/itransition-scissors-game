import { NodeModel } from '../model/nodeModel.ts';
import * as Readline from 'readline-sync';
import { PrintTable } from '../utils/printTable.ts';

export class GameView {
  private table!: PrintTable;

  public printUserMenu(nodes: NodeModel[]): string {
    const readline = Readline;

    this.printLog('Available moves:');
    nodes.forEach(
      (node, index) => this.printLog(`${index + 1} - ${node.getNodeName()}`)
    );
    this.printLog('0 - exit');
    this.printLog('? - help');

    const userInput = readline.question('Enter your move: ');

    if (userInput === '?' || userInput === '0') {
      return userInput;
    }

    const moveNumber = Number.parseInt(userInput);

    if (isNaN(moveNumber) || moveNumber < 1 || moveNumber > nodes.length) {
      this.printLog('Invalid move. Try again.');
      return this.printUserMenu(nodes);
    }
    return nodes[moveNumber - 1].getNodeName();
  }

  public printLog(log: string = ''): void {
    console.log(log);
  }

  public showHelp(nodes: NodeModel[]): void {
    this.table = new PrintTable(nodes)
    this.printLog(this.table.renderTable());
  }

  public clearConsole(): void {
    console.clear();
  }
}
