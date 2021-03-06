import React, { Component } from 'react';

import Button from 'components/Button';

import { IThemeContext, ThemeContext } from 'theme-context';

import './index.css';

export default class ThemeButton extends Component {
  public static contextType = ThemeContext;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(data: IThemeContext) => (
          <Button type="button" className="theme-button" onClick={data.toggleTheme} theme={data.theme}>
            {data.theme}
          </Button>
        )}
      </ThemeContext.Consumer>
    );
  }
}
