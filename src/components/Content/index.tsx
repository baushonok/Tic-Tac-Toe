import React, { Component, lazy } from 'react';

import Header from './Header';

const Auth = lazy(() => import('../Auth'));
const Game = lazy(() => import('../Game'));

interface IProps {
  isFirstLogin: boolean;
  isLoggedOn: boolean;
  username: string;
  onSuccessLogin: (username: string) => void;
}
export default class Content extends Component<IProps> {
  public render() {
    const { isFirstLogin, isLoggedOn, username, onSuccessLogin } = this.props;
    return (
      <div>
        <Header />
        <div>
          {isLoggedOn ? (
            <Game isFirstLogin={isFirstLogin} username={username} />
          ) : (
            <Auth onSuccessLogin={onSuccessLogin} />
          )}
        </div>
      </div>
    );
  }
}
