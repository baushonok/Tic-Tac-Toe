import React, { Component, lazy, MouseEvent } from 'react';

import Header from './Header';

const Auth = lazy(() => import('../Auth'));
const Game = lazy(() => import('../Game'));

interface IProps {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  username: string;
  onSuccessLogin: (username: string) => void;
  onThemeChange: (event: MouseEvent) => void;
}
export default class Content extends Component<IProps> {
  public render() {
    const { isFirstLogin, isLoggedOn, username, onSuccessLogin, onThemeChange } = this.props;
    return (
      <div>
        <Header onThemeChange={onThemeChange} />
        <main>
          {isLoggedOn ? (
            <Game isFirstLogin={isFirstLogin} username={username} />
          ) : (
            <Auth onSuccessLogin={onSuccessLogin} />
          )}
        </main>
      </div>
    );
  }
}
