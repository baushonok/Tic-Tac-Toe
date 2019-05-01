import React from 'react';

interface IProps {
  state: boolean
}

export default function WarningMessage(props: IProps) {
  if (!props.state) {
    return null;
  }
  return (
    <div className="auth-form__warning">
      Incorrect login or password
    </div>
  );
}
