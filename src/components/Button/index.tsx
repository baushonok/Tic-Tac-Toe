import React, { Component, MouseEvent } from 'react';

import './index.css';

interface IProps {
  className?: string;
  content: string;
  onClick?: (event: MouseEvent) => void;
  theme?: string;
  type: 'submit' | 'reset' | 'button';
}

export default class Button extends Component<IProps> {
  public render() {
    const { className, content, onClick, theme, type } = this.props;
    return (
      <button type={type} className={`${className} button_${theme}`} onClick={onClick}>
        {content}
      </button>
    );
  }
}
