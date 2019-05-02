import React, { Component, FormEvent, SyntheticEvent } from 'react';

import WarningMessage from './WarningMessage';

import { IS_LOGGED_ON } from './constants';

import './index.css';

interface IProps {
  onSuccessLoginHandler: (username: string) => void;
}

interface IState {
  login: string;
  password: string;
  shouldShowWarning: boolean;
}

export default class Auth extends Component<IProps, IState> {
  public state = {
    login: '',
    password: '',
    shouldShowWarning: false,
  };

  public render() {
    const { login, password, shouldShowWarning } = this.state;

    return (
      <form className="auth-form" onSubmit={this.login}>
        <div className="auth-form__login">
          <label htmlFor="login">Login</label>
          <input type="text" id="login" name="login" value={login} onChange={this.handleChangeLoginForm} />
        </div>
        <div className="auth-form__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handleChangeLoginForm} />
        </div>
        {shouldShowWarning ? <WarningMessage /> : null}
        <button type="submit" className="auth-form__button" disabled={shouldShowWarning}>
          Log in
        </button>
      </form>
    );
  }

  private login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.isAuthDataValid()) {
      localStorage.setItem(IS_LOGGED_ON, 'true');
      this.props.onSuccessLoginHandler(this.state.login);
      return;
    }

    this.setState({
      shouldShowWarning: true,
    });
  };
  private handleChangeLoginForm = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    switch (name) {
      case 'login': {
        this.changeLogin(value);
        break;
      }
      case 'password': {
        this.changePassword(value);
        break;
      }
      default: {
        throw new Error(`Unknown input name ${name}`);
      }
    }
  };
  private changeLogin = (login: string) => {
    this.setState({
      login,
      shouldShowWarning: false,
    });
  };
  private changePassword = (password: string) => {
    this.setState({
      password,
      shouldShowWarning: false,
    });
  };
  private isAuthDataValid() {
    const { login, password } = this.state;

    return login === 'login' && password === 'password';
  }
}
