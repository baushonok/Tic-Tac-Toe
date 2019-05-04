import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader';

import About from './components/About';
import Content from './components/Content';

import { IS_LOGGED_ON } from './components/Auth/constants';

import './index.css';

// ========================================

interface IState {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  username: string;
}
class App extends Component<{}, IState> {
  public state = {
    isFirstLogin: false,
    isLoggedOn: !!localStorage.getItem(IS_LOGGED_ON),
    username: '',
  };
  public render() {
    return (
      <Router>
        <Suspense fallback={Loader}>
          <Switch>
            <Route exact path="/" component={this.getContentComponent} />
            <Route path="/about" component={About} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
  private getContentComponent = () => {
    const { isFirstLogin, isLoggedOn, username } = this.state;

    return (
      <Content
        isFirstLogin={isFirstLogin}
        isLoggedOn={isLoggedOn}
        username={username}
        onSuccessLogin={this.handleSuccessLogin}
      />
    );
  };
  private handleSuccessLogin = (username: string) => {
    this.setState({ isLoggedOn: true, isFirstLogin: true, username });
  };
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element does not exist');
}

ReactDOM.render(<App />, container);
