import React, { ReactElement } from 'react';

import './index.css';

interface IProps {
  children: ReactElement | ReactElement[];
}
export default function Dialog(props: IProps) {
  return (
    <aside className="dialog">
      <div className="dialog__content">{props.children}</div>
    </aside>
  );
}
