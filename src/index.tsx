import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Game from './components/Game';
import { IS_LOGGED_ON } from './components/Auth/constants';
import './index.css';

// ========================================

interface IState {
  isLoggenOn: boolean
}

class Content extends Component<{}, IState> {
  state = {
    isLoggenOn: !!localStorage.getItem(IS_LOGGED_ON),
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

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element does not exist');
}

ReactDOM.render(
  <Content />,
  container
);
