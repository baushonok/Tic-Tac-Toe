import React, { Component, lazy } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from './Header';

const Auth = lazy(() => import('components/Auth'));
const Game = lazy(() => import('components/Game'));

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
            <ErrorBoundary>
              <Game isFirstLogin={isFirstLogin} username={username} />
            </ErrorBoundary>
          ) : (
            <Auth onSuccessLogin={onSuccessLogin} />
          )}
        </div>
      </div>
    );
  }
}
