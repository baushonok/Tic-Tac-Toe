import React, { Component, ReactElement } from 'react';
import Board from '../Board';

const AMOUNT_OF_ROWS = 3;
const AMOUNT_OR_COLUMNS = 3;

interface ISquare {
  squares: string[] | null[];
}

export default class Game extends Component {
  public state = {
    gameIsFinished: false,
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    lastChosenStep: -1,
    stepNumber: 0,
    xIsNext: true,
  };

  public render(): ReactElement {
    const { history, stepNumber, lastChosenStep } = this.state;
    const current = history[stepNumber];
    const { winner, winCombination } = calculateWinner(current.squares);
    const moves = this.getMoves(history, lastChosenStep);

    let status;

    if (winner) {
      status = `Won ${winner}`;
    } else {
      status = this.state.gameIsFinished ? 'dead heat' : `Next player: ${this.nextStep()}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={this.handleClick}
            winCombination={winCombination}
            amountOfRows={AMOUNT_OF_ROWS}
            amountOfColumns={AMOUNT_OR_COLUMNS}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className="history-steps">{moves}</ol>
        </div>
      </div>
    );
  }
  private handleClick = (i: number): void => {
    const { history: historyOrigin, stepNumber, gameIsFinished, xIsNext } = this.state;
    const history = historyOrigin.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0);
    const { winner } = calculateWinner(squares);
    if (winner || squares[i] || gameIsFinished) {
      return;
    }
    squares[i] = this.nextStep();
    this.setState({
      gameIsFinished: isLastStep(stepNumber),
      history: history.concat([
        {
          squares,
        },
      ]),
      lastChosenStep: -1,
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  };

  private jumpTo = (step: number): void => {
    this.setState({
      gameIsFinished: isLastStep(this.state.stepNumber),
      lastChosenStep: step,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  private nextStep = (): string => {
    return this.state.xIsNext ? 'X' : '0';
  };

  private getMoves = (history: ISquare[], lastChosenStep: number) =>
    history.map((step, index: number) => {
      const description = index ? `Go to step # ${index}` : 'Go to the start of the game';

      return (
        <li key={index} className={lastChosenStep === index ? 'active' : ''}>
          <button onClick={() => this.jumpTo(index)}>{description}</button>
        </li>
      );
    });
}

function getBoardSize(): number {
  return AMOUNT_OF_ROWS * AMOUNT_OR_COLUMNS;
}

function isLastStep(step: number): boolean {
  return step === getBoardSize() - 1;
}

function calculateWinner(squares: string[]): { winner: string | null; winCombination: number[] } {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winCombination: line,
        winner: squares[a],
      };
    }
  }
  return {
    winCombination: [],
    winner: null,
  };
}
