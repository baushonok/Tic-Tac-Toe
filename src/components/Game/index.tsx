import React, { Component, createRef, ReactElement, RefObject } from 'react';

import Board from 'components/Board';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import HistorySteps, { ISquare } from './HistorySteps';

import { ThemeContext } from 'theme-context';
import { AMOUNT_OF_ROWS, AMOUNT_OR_COLUMNS } from './constants';
import { isLastStep } from './helpers';

import './index.css';

interface IProps {
  isFirstLogin: boolean;
  username: string;
}
interface IState {
  gameIsFinished: boolean;
  history: ISquare[];
  lastChosenStep: number;
  shouldShowRules: boolean;
  shouldShowSuccessAuthDialog: boolean;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends Component<IProps, IState> {
  public static contextType = ThemeContext;
  public state = {
    gameIsFinished: false,
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    lastChosenStep: -1,
    shouldShowRules: false,
    shouldShowSuccessAuthDialog: this.props.isFirstLogin,
    stepNumber: 0,
    xIsNext: true,
  };
  private buttonShowRules = createRef() as RefObject<HTMLButtonElement>;

  public render(): ReactElement {
    const {
      gameIsFinished,
      history,
      lastChosenStep,
      shouldShowRules,
      shouldShowSuccessAuthDialog,
      stepNumber,
    } = this.state;
    const { username } = this.props;
    const current = history[stepNumber];
    const { winner, winCombination } = calculateWinner(current.squares);
    let status: string;

    if (winner) {
      status = `Won ${winner}`;
    } else {
      status = gameIsFinished ? 'dead heat' : `Next player: ${this.nextStep()}`;
    }

    return (
      <main className="content">
        <Button
          type="button"
          className="show-rules-btn"
          onClick={this.handleShowRulesClick}
          refObj={this.buttonShowRules}
          content="Show rules"
          theme={this.context.theme}
        />
        <div className="game">
          <div className="game__board">
            <Board
              squares={current.squares}
              onClick={this.handleClick}
              winCombination={winCombination}
              amountOfRows={AMOUNT_OF_ROWS}
              amountOfColumns={AMOUNT_OR_COLUMNS}
            />
          </div>
          <div className="game__info">
            <div>{status}</div>
            <HistorySteps data={history} lastChosenStep={lastChosenStep} onJumpTo={this.handleJumpTo} />
          </div>
          {shouldShowSuccessAuthDialog ? (
            <Dialog>
              <h1>Hi again, {username}!</h1>
              <button type="button" onClick={this.handleClosingDialog}>
                Close dialog
              </button>
            </Dialog>
          ) : null}
          {shouldShowRules ? (
            <Dialog>
              <h1>Some title</h1>
              <p>rules</p>
              <button type="button" onClick={this.handleClosingRules}>
                Hide rules
              </button>
            </Dialog>
          ) : null}
        </div>
      </main>
    );
  }

  private handleShowRulesClick = (): void => {
    this.setState({
      shouldShowRules: true,
    });
  };
  private handleClosingRules = (): void => {
    this.setState({
      shouldShowRules: false,
    });
    if (this.buttonShowRules.current) {
      this.buttonShowRules.current.focus();
    }
  };
  private handleClick = (i: number): void => {
    const { gameIsFinished, history: historyOrigin, stepNumber, xIsNext } = this.state;
    const history = historyOrigin.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0);
    const { winner } = calculateWinner(squares);
    if (winner || squares[i] || gameIsFinished) {
      return;
    }
    squares[i] = this.nextStep();
    this.setState({
      gameIsFinished: isLastStep(stepNumber, AMOUNT_OF_ROWS, AMOUNT_OR_COLUMNS),
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
  private handleJumpTo = (step: number): void => {
    this.setState({
      gameIsFinished: isLastStep(this.state.stepNumber, AMOUNT_OF_ROWS, AMOUNT_OR_COLUMNS),
      lastChosenStep: step,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };
  private nextStep = (): string => {
    return this.state.xIsNext ? 'X' : '0';
  };
  private handleClosingDialog = () => {
    this.setState({
      shouldShowSuccessAuthDialog: false,
    });
  };
}

interface IWinnerInfo {
  winner: string | null;
  winCombination: number[];
}
function calculateWinner(squares: string[]): IWinnerInfo {
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
