import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Game from './components/Game';

import { IS_LOGGED_ON } from './components/Auth/constants';

import './index.css';

// ========================================

interface IState {
  isLoggedOn: boolean;
}

class Content extends Component<{}, IState> {
  public state = {
    isLoggedOn: !!localStorage.getItem(IS_LOGGED_ON),
  };

  public render() {
    return this.state.isLoggedOn ? <Game /> : <Auth onSuccessLoginHandler={this.successLoginHandler} />;
  }
  private successLoginHandler = () => {
    this.setState({ isLoggedOn: true });
  };
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element does not exist');
}

ReactDOM.render(<Content />, container);
