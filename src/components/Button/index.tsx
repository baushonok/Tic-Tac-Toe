import React, { Component, MouseEvent, ReactNode, RefObject } from 'react';

import './index.css';

interface IProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  refObj?: RefObject<HTMLButtonElement>;
  theme?: string;
  type: 'submit' | 'reset' | 'button';
}

export default class Button extends Component<IProps> {
  public render() {
    const { children, className, onClick, refObj, theme, type } = this.props;
    return (
      <button type={type} className={`${className} button_${theme}`} onClick={onClick} ref={refObj}>
        {children}
      </button>
    );
  }
}
