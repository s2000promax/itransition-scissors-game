import { GameCrypto } from '../utils/crypto.ts';
import { GameModel } from '../model/gameModel.ts';
import { GameView } from '../view/gameView.ts';
import { GameRules } from '../model/gameRules.ts';

export class GameController {
  private readonly gameParams: string[] | undefined;
  private gameCrypto: GameCrypto;
  private gameModel: GameModel;
  private gameView: GameView;
  private gameRules: GameRules;

  private readonly hmac_key: string;
  private hmac_computer: string = '';
  private hmac_user: string = '';

  constructor(public readonly params: string[]) {
    this.gameView = new GameView();
    this.gameCrypto = new GameCrypto();
    this.hmac_key = this.gameCrypto.generateHmacKey();
    this.gameParams = this.validateParams(params);
    this.gameModel = new GameModel(this.gameParams!);
    this.gameRules = new GameRules();
  }

  public playRound(): void {
    this.gameView.clearConsole();

    const computerMove = this.gameRules.getRandomMove(this.gameModel.getNodes());
    const computerNode = this.gameModel.findNode(computerMove);
    this.hmac_computer = this.gameCrypto.encode(this.hmac_key, computerMove);
    this.gameView.printLog(`HMAC: ${this.hmac_computer}`);

    const userMove = this.getUserMove();
    this.hmac_user = this.gameCrypto.encode(this.hmac_key, userMove);
    const userNode = this.gameModel.findNode(userMove);

    this.gameView.printLog(`Your move: ${userMove}`);
    this.gameView.printLog(`HMAC your move: ${this.hmac_user}`);
    this.gameView.printLog(`Computer move: ${computerMove} (${this.gameCrypto.validateHMAC(this.hmac_key, this.hmac_computer, computerMove)})`);

    this.gameView.printLog(this.gameRules.getResult(userNode, computerNode));
    this.gameView.printLog(`HMAC key: ${this.hmac_key}`)
  }

  private getUserMove(): string {
    let userMove = this.gameView.printUserMenu(this.gameModel.getNodes());

    if (userMove === '0') {
      this.appTerminate();
    }

    if (userMove === '?') {
      this.gameView.showHelp(this.gameModel.getNodes());
      userMove = this.getUserMove();
    }

    return userMove;
  }

  private validateParams(params: string[]): string[] | undefined {
    switch (true) {
      case !params.length:
        this.gameView.printLog('The game can only be started with parameters. For example, use Rock Paper Scissors as arguments');
        this.appTerminate();
        break;
      case params.length < 3:
        this.gameView.printLog('Arguments must be three or more');
        this.appTerminate();
        break;
      case params.length % 2 === 0:
        this.gameView.printLog('Arguments count must be odd');
        this.appTerminate();
        break;
      case params.length !== new Set(params).size:
        this.gameView.printLog('Arguments must be unique');
        this.appTerminate();
        break;
      default:
        return params;
    }
  }

  private appTerminate(): void {
    this.gameView.printLog('The application has stopped');
    process.exit();
  }
}
