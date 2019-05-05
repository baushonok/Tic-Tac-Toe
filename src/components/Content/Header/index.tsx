import React, { lazy } from 'react';
import { Link } from 'react-router-dom';

import ErrorBoundaryButton from './ErrorBoundaryButton';

import './index.css';

const ThemeButton = lazy(() => import('./ThemeButton'));

export default function Header() {
  return (
    <header className="page-header">
      <Link to="/about">About app</Link>
      <ThemeButton />
      <ErrorBoundaryButton />
    </header>
  );
}
