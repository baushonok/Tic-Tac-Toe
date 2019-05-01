import React, { PureComponent } from 'react';

interface IProps {
  index: number;
  isInWinCombination: boolean;
  onClick: (i: number) => void;
  value: string;
}

export default class Square extends PureComponent<IProps> {
  render() {
    const { isInWinCombination, value } = this.props;
    return (
      <button className={`square ${isInWinCombination ? 'marked' : ''}`} onClick={this.clickHandler}>
        {value}
      </button>
    );
  }

  clickHandler = () => {
    const { index, onClick } = this.props;

    onClick(index);
  };
}
