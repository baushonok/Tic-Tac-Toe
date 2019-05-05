import React, { Component } from 'react';

import Button from 'components/Button';

export default class ErrorBoundaryButton extends Component {
  public render() {
    return <Button type="button" onClick={this.handleClick} content="Show error" />;
  }
  private handleClick() {
    throw new Error('Some error');
  }
}
