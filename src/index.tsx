import React, { Component, createContext, MouseEvent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader';

import About from './components/About';
import Content from './components/Content';

import { IS_LOGGED_ON } from './components/Auth/constants';
import { THEMES } from './constants';

import { getRandom } from './helpers';

import './index.css';

// ========================================

const DEFAULT_THEME = THEMES[0];
export const Theme = createContext(DEFAULT_THEME);

interface IState {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  theme: string;
  username: string;
}
class App extends Component<{}, IState> {
  public state = {
    isFirstLogin: false,
    isLoggedOn: !!localStorage.getItem(IS_LOGGED_ON),
    theme: DEFAULT_THEME,
    username: '',
  };
  public render() {
    return (
      <Theme.Provider value={this.state.theme}>
        <Router>
          <Suspense fallback={Loader}>
            <Switch>
              <Route exact path="/" component={this.getContentComponent} />
              <Route path="/about" component={About} />
            </Switch>
          </Suspense>
        </Router>
      </Theme.Provider>
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
        onThemeChange={this.toggleTheme}
      />
    );
  };
  private handleSuccessLogin = (username: string) => {
    this.setState({ isLoggedOn: true, isFirstLogin: true, username });
  };
  private toggleTheme = (event: MouseEvent) => {
    const { theme } = this.state;
    const availableThemes = THEMES.filter(item => item !== theme);
    const index = getRandom(0, availableThemes.length - 1);
    this.setState({ theme: availableThemes[index] });
  };
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element does not exist');
}

ReactDOM.render(<App />, container);
