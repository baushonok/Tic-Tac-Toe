import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square"
            onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)} />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    lastChosenStep: -1,
    stepNumber: 0,
    xIsNext: true
  };
  jumpTo(step) {
    this.setState({
      lastChosenStep: step,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  nextStep() {
    return this.state.xIsNext ? 'X' : '0';
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(0);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.nextStep();
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      lastChosenStep: -1,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

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

    let status = winner
      ? `Won ${winner}`
      : `Next player: ${this.nextStep()}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
                 onClick={(i) => this.handleClick(i)} />
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
