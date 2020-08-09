import React, { useEffect, useState } from 'react';

export default function Fade({ children, className, durationMs, show }) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) {
    return null;
  }

  const animation = `${
    show ? 'fade-in' : 'fade-out'
  } ${durationMs}ms ease-in-out`;

  return (
    <div
      className={className}
      style={{ animation }}
      onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
}
