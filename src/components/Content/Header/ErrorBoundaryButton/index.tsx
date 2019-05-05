import React from 'react';

import Button from 'components/Button';

export default function ErrorBoundaryButton() {
  function handleClick() {
    throw new Error('Some error');
  }
  return <Button type="button" onClick={handleClick} content="Show error" />;
}
