import React, {Component, ReactElement} from 'react';
import Board from '../Board';

const AMOUNT_OF_ROWS = 3;
const AMOUNT_OR_COLUMNS = 3;

export default class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    lastChosenStep: -1,
    stepNumber: 0,
    gameIsFinished: false,
    xIsNext: true
  };
  jumpTo(step: number): void {
    this.setState({
      lastChosenStep: step,
      stepNumber: step,
      gameIsFinished: isLastStep(this.state.stepNumber),
      xIsNext: (step % 2) === 0
    });
  }
  nextStep(): string {
    return this.state.xIsNext ? 'X' : '0';
  }
  handleClick(i: number): void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0);
    const { winner } = calculateWinner(squares);
    if (winner || squares[i] || this.state.gameIsFinished) {
      return;
    }
    squares[i] = this.nextStep();
    this.setState({
      history: history.concat([{
        squares,
      }]),
      lastChosenStep: -1,
      gameIsFinished: isLastStep(this.state.stepNumber),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  render(): ReactElement {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winCombination } = calculateWinner(current.squares);

    const moves = history.map((step, index) => {
      const description = index
        ? `Go to step # ${index}`
        : `Go to the start of the game`;
      return (
        <li key={index}
            className={this.state.lastChosenStep === index ? 'active' : ''}>
          <button onClick={() => this.jumpTo(index)}>
            {description}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Won ${winner}`;
    } else {
      status = this.state.gameIsFinished
        ? 'dead heat'
        : `Next player: ${this.nextStep()}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
                 onClick={(i) => this.handleClick(i)}
                 winCombination={winCombination}
                 amountOfRows={AMOUNT_OF_ROWS}
                 amountOfColumns={AMOUNT_OR_COLUMNS} />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <ol className="history-steps">
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

function getBoardSize(): number {
  return AMOUNT_OF_ROWS * AMOUNT_OR_COLUMNS;
}

function isLastStep(step: number): boolean {
  return step === getBoardSize() - 1
}

function calculateWinner(squares: string[]): {winner: string|null, winCombination: number[]} {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winCombination: lines[i]
      };
    }
  }
  return {
    winner: null,
    winCombination: []
  };
}
