import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Game from './components/Game';

import { IS_LOGGED_ON } from './components/Auth/constants';

import './index.css';

// ========================================

interface IState {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  username: string;
}

class Content extends Component<{}, IState> {
  public state = {
    isFirstLogin: false,
    isLoggedOn: !!localStorage.getItem(IS_LOGGED_ON),
    username: '',
  };

  public render() {
    const { isFirstLogin, isLoggedOn, username } = this.state;
    return isLoggedOn ? (
      <Game isFirstLogin={isFirstLogin} username={username} />
    ) : (
      <Auth onSuccessLoginHandler={this.successLoginHandler} />
    );
  }
  private successLoginHandler = (username: string) => {
    this.setState({ isLoggedOn: true, isFirstLogin: true, username });
  };
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element does not exist');
}

ReactDOM.render(<Content />, container);
