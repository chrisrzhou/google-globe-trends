import React, { useEffect, useState } from 'react';

export default function Fade({ children, className, durationMs = 800, show }) {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) {
      setRender(true);
    }
  }, [show]);

  function onAnimationEnd() {
    if (!show) {
      setRender(false);
    }
  }

  const animationKeyFrame = show ? 'fade-in' : 'fade-out';

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={className}
      style={{ animation: `${animationKeyFrame} ${durationMs}ms` }}
      onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
}
