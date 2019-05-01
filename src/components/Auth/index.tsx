import React, {
  Component,
  SyntheticEvent,
  FormEvent
} from 'react';
import WarningMessage from './WarningMessage';
import './index.css';

interface IProps {
  onSuccessLoginHandler: () => void,
};

interface IState {
  login: string,
  password: string,
  showWarning: boolean
};

export default class Auth extends Component<IProps, IState> {
  state = {
    login: '',
    password: '',
    showWarning: false
  };

  login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { login, password } = this.state;
    if (login === 'login' && password === 'password') {
      localStorage.setItem('isLoggenOn', 'true');
      this.props.onSuccessLoginHandler();
    } else {
      localStorage.removeItem('isLoggenOn');
      this.setState({
        showWarning: true
      });
    }
  }
  handleChangeLogin = (event: SyntheticEvent<HTMLInputElement>) => {
    let target = event.target as HTMLInputElement;
    this.setState({
      login: target.value,
      showWarning: false,
    });
  }
  handleChangePassword = (event: SyntheticEvent<HTMLInputElement>) => {
    let target = event.target as HTMLInputElement;
    this.setState({
      password: target.value,
      showWarning: false,
    });
  }
  render() {
    return (
      <form className="auth-form"
            onSubmit={this.login}>
        <div className="auth-form__login">
          <label htmlFor="login">
            Login
          </label>
          <input type="text"
                 id="login"
                 name="login"
                 value={this.state.login}
                 onChange={this.handleChangeLogin} />
        </div>
        <div className="auth-form__password">
          <label htmlFor="password">
            Password
          </label>
          <input type="password"
                 id="password"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChangePassword} />
        </div>
        <WarningMessage state={this.state.showWarning} />
        <button type="submit"
                className="auth-form__button">
          Log in
        </button>
      </form>
    );
  }
}
