import React, { Component, ReactElement } from 'react';

interface IProps {
  children: ReactElement | ReactElement[];
}
interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  public static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }
  public state = {
    hasError: false,
  };
  public render() {
    if (this.state.hasError) {
      return <div>Catched error</div>;
    }
    return this.props.children;
  }
}
