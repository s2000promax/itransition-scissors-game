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

  constructor(
    public readonly nodes: NodeModel[],
    public readonly adjacencyMatrix: boolean[][],
  ) {
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

    this.table.addRows(this.createRows(nodes, adjacencyMatrix))
  }

  private createRows(nodes: NodeModel[], adjacencyMatrix: boolean[][]): Array<RowInterface> {
    const rows: Array<RowInterface> = [];

    for (let i = 0; i < adjacencyMatrix.length; i += 1) {
      const row: RowInterface = {
        header: nodes[i].getNodeName(),
      };
      for (let j = 0; j < adjacencyMatrix.length; j += 1) {
        if (i == j) {
          row[nodes[j].getNodeName()] = 'Draw';
        } else {
          row[nodes[j].getNodeName()] = !adjacencyMatrix[i][j] ? 'Win' : 'Lose';
        }
      }
      rows.push(row);
    }

    return rows;
  }

  public renderTable(): string {
    return this.table.render();
  }
}
