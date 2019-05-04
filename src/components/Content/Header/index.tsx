import React, { lazy, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const ThemeButton = lazy(() => import('./ThemeButton'));

interface IProps {
  onThemeChange: (event: MouseEvent) => void;
}

export default function Header(props: IProps) {
  const { onThemeChange } = props;
  return (
    <header className="page-header">
      <Link to="/about">About app</Link>
      <ThemeButton onClick={onThemeChange} />
    </header>
  );
}
