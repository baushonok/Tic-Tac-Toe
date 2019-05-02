import React, { Component } from 'react';

import './index.css';

interface IProps {
  index: number;
  description: string;
  onJumpTo: (step: number) => void;
}

export default class HistoryStepButton extends Component<IProps> {
  public render() {
    const { description } = this.props;
    return (
      <button onClick={this.handleClick} className="history-step__button">
        {description}
      </button>
    );
  }
  private handleClick = () => {
    const { index, onJumpTo } = this.props;
    onJumpTo(index);
  };
}
