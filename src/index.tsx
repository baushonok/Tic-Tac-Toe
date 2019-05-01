import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Game from './components/Game';
import './index.css';

// ========================================

interface IState {
  isLoggenOn: boolean
}

class Content extends Component<{}, IState> {
  state = {
    isLoggenOn: !!localStorage.getItem('isLoggenOn'),
  };

  successLoginHandler = () => {
    this.setState({ isLoggenOn: true });
  }

  render() {
    const { isLoggenOn } = this.state;

    return isLoggenOn
      ? <Game />
      : <Auth onSuccessLoginHandler={this.successLoginHandler} />;
  }
}

ReactDOM.render(
  <Content />,
  document.getElementById('root')
);
