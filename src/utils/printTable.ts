import { Table } from 'console-table-printer';
import { NodeModel } from '../model/nodeModel.ts';
import {
  DEFAULT_HEADER_FONT_COLOR
} from 'console-table-printer/dist/src/utils/table-constants.js';

interface RowInterface {
  [key: string]: string;
}

export class PrintTable {
  private table: Table;
  constructor(public readonly nodes: NodeModel[]) {
    this.table = new Table({
      title: 'Winning moves for the user',
      rowSeparator: true,
      columns: [
        {
          name: 'header',
          alignment: 'center',
          title: 'v PC\\User >',
          color: DEFAULT_HEADER_FONT_COLOR
        },
        ...nodes.map(node => ({
          name: node.getNodeName(),
          alignment: 'center'
        })),
      ]
    });

    this.table.addRows(this.createRows(nodes))
  }

  private createRows(nodes: NodeModel[]): Array<RowInterface> {
    const moves = nodes.map(nm => nm.getNodeName());
    const rows: Array<RowInterface> = [];

    for (let i = 0; i < moves.length; i += 1) {
      const row: { [key: string]: string } = {
        header: moves[i],
        [moves[i]]: 'Draw'
      };

      const moveConnections = [...nodes[i].getConnections().values()]

      moves.filter(m => m !== moves[i]).forEach((connection, index) => {
        row[connection] = moveConnections[index] ? 'Win' : 'Lose'
      })
      rows.push(row);
    }

    return rows;
  }

  public renderTable(): string {
    return this.table.render();
  }
}
