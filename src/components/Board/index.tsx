import React, { Component, ReactElement } from 'react';

import Square from 'components/Square';

import './index.css';

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

    return <div className="board">{this.createSquares(amountOfRows, amountOfColumns)}</div>;
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
    for (let i = 0; i < amountOfSquares; i++) {
      rows = rows.concat(this.renderSquare(i));
    }

    return rows;
  }
}
