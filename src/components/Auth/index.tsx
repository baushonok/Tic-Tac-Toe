import React, { Component, FormEvent, SyntheticEvent } from 'react';

import WarningMessage from './WarningMessage';

import { IS_LOGGED_ON } from './constants';

import './index.css';

interface IProps {
  onSuccessLoginHandler: () => void;
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
          <input type="text" id="login" name="login" value={login} onChange={this.handleChangeLogin} />
        </div>
        <div className="auth-form__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={this.handleChangePassword} />
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
      this.props.onSuccessLoginHandler();
      return;
    }

    this.setState({
      shouldShowWarning: true,
    });
  };
  private handleChangeLogin = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      login: target.value,
      shouldShowWarning: false,
    });
  };
  private handleChangePassword = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      password: target.value,
      shouldShowWarning: false,
    });
  };
  private isAuthDataValid() {
    const { login, password } = this.state;

    return login === 'login' && password === 'password';
  }
}
