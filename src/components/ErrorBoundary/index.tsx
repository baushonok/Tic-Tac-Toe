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
    return this.state.hasError ? (
      <section>
        <h1>Something went wrong</h1>
        <p>Some error info</p>
      </section>
    ) : (
      this.props.children
    );
  }
}
