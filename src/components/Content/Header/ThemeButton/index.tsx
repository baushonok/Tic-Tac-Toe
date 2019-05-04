import React, { Component, MouseEvent } from 'react';

import Button from '../../../Button';

import { Theme } from '../../../../index';

import './index.css';

interface IProps {
  onClick: (event: MouseEvent) => void;
}

export default class ThemeButton extends Component<IProps> {
  public static contextType = Theme;

  public render() {
    const { onClick } = this.props;
    return (
      <Button type="button" className="theme-button" onClick={onClick} theme={this.context} content={this.context} />
    );
  }
}
