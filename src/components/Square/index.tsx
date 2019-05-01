import React from 'react';

interface IProps {
  isInWinCombination: boolean,
  onClick: () => void,
  value: string
}

export default function Square(props: IProps) {
  return (
    <button className={`square ${props.isInWinCombination ? 'marked' : ''}`}
            onClick={props.onClick}>
      {props.value}
    </button>
  );
}
