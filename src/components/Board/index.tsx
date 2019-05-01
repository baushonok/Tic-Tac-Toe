import React, {Component, ReactElement} from 'react';
import Square from '../Square';

interface IProps {
  squares: string[],
  onClick: (i: number) => void,
  winCombination: unknown[],
  amountOfRows: number,
  amountOfColumns: number
}

export default class Board extends Component<IProps> {
  renderSquare(i: number): ReactElement {
    return (
      <Square key={i}
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              isInWinCombination={this.props.winCombination.includes(i)} />
    );
  }
  createSquares(amountOfRows: number, amountOfColumns: number) {
    const amountOfSquares = amountOfRows * amountOfColumns;
    let rows: ReactElement[] = [];
    let children: ReactElement[] = [];
    for (let i = 1; i <= amountOfSquares; i++) {
      children = children.concat(this.renderSquare(i - 1));
      if (i % amountOfColumns === 0) {
        rows = rows.concat(<div className="board-row" key={i}>{children}</div>);
        children = [];
      }
    }

    return rows;
  }
  render() {
    return (
      <div>
        {this.createSquares(this.props.amountOfRows, this.props.amountOfColumns)}
      </div>
    );
  }
}
