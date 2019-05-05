import React, { Component, MouseEvent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader } from './components/Loader';

import About from './components/About';
import Content from './components/Content';

import { IS_LOGGED_ON } from './components/Auth/constants';
import { THEMES } from './constants';
import { DEFAULT_THEME, IThemeContext, ThemeContext } from './theme-context';

import { getRandom } from './helpers';

import './index.css';

// ========================================

interface IState {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  theme: string;
  username: string;
  toggleTheme: (event: MouseEvent) => void;
}
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isFirstLogin: false,
      isLoggedOn: !!localStorage.getItem(IS_LOGGED_ON),
      theme: DEFAULT_THEME,
      toggleTheme: this.toggleTheme,
      username: '',
    };
  }
  public render() {
    const contextObj: IThemeContext = {
      theme: this.state.theme,
      toggleTheme: this.state.toggleTheme,
    };

    return (
      <ThemeContext.Provider value={contextObj}>
        <Router>
          <Suspense fallback={Loader}>
            <Switch>
              <Route exact path="/" component={this.getContentComponent} />
              <Route path="/about" component={About} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeContext.Provider>
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
