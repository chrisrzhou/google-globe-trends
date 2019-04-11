import React from 'react';

interface Props {
  label: string;
  onClick?: (event: React.MouseEvent) => void;
}

function Button({ label, onClick }: Props): React.ReactElement {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
