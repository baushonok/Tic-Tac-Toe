import React, { Component, ReactElement } from 'react';
import Square from '../Square';

interface IProps {
  squares: string[];
  onClick: (i: number) => void;
  winCombination: unknown[];
  amountOfRows: number;
  amountOfColumns: number;
}

export default class Board extends Component<IProps> {
  public render() {
    const { amountOfRows, amountOfColumns } = this.props;
    const rows = this.createSquares(amountOfRows, amountOfColumns);

    return <div>{rows}</div>;
  }
  private renderSquare(i: number): ReactElement {
    const { squares, onClick, winCombination } = this.props;

    return (
      <Square key={i} index={i} value={squares[i]} onClick={onClick} isInWinCombination={winCombination.includes(i)} />
    );
  }
  private createSquares(amountOfRows: number, amountOfColumns: number) {
    const amountOfSquares = amountOfRows * amountOfColumns;
    let rows: ReactElement[] = [];
    let children: ReactElement[] = [];
    for (let i = 1; i <= amountOfSquares; i++) {
      children = children.concat(this.renderSquare(i - 1));
      if (i % amountOfColumns === 0) {
        rows = rows.concat(
          <div className="board-row" key={i}>
            {children}
          </div>,
        );
        children = [];
      }
    }

    return rows;
  }
}
