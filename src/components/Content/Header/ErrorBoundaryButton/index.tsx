import React, { Component, MouseEvent } from 'react';

import Button from 'components/Button';

interface IState {
  hasError: boolean;
}
export default class ErrorBoundaryButton extends Component<{}, IState> {
  public state = {
    hasError: false,
  };
  public render() {
    if (this.state.hasError) {
      throw new Error('Some error');
    }
    return (
      <Button type="button" onClick={this.handleClick}>
        Show error
      </Button>
    );
  }
  private handleClick = (event: MouseEvent) => {
    this.setState((state: IState) => ({
      hasError: !state.hasError,
    }));
  };
}
