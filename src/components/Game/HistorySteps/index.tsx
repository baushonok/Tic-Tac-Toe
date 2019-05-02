import React, { Component } from 'react';

import './index.css';

interface ISquare {
  squares: string[] | null[];
}

interface IProps {
  data: ISquare[];
  lastChosenStep: number;
  onJumpTo: (stepNumber: number) => void;
}

export default class HistorySteps extends Component<IProps> {
  public render() {
    const { data, lastChosenStep } = this.props;
    const moves = this.getMoves(data, lastChosenStep);

    return <ol className="game__history-steps">{moves}</ol>;
  }
  private getMoves = (history: ISquare[], lastChosenStep: number) =>
    history.map((step, index: number) => {
      const description = index ? `Go to step # ${index}` : 'Go to the start of the game';

      return (
        <li key={index} className={lastChosenStep === index ? 'history-step_active' : 'history-step'}>
          <button onClick={() => this.props.onJumpTo(index)} className="history-step__button">
            {description}
          </button>
        </li>
      );
    });
}
