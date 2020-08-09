import React, { useEffect, useState } from 'react';

export default function Fade({ children, className, shown }) {
  const [shouldRender, setShouldRender] = useState(shown);

  useEffect(() => {
    if (shown) {
      setShouldRender(true);
    }
  }, [shown]);

  const onAnimationEnd = () => {
    if (!shown) {
      setShouldRender(false);
    }
  };

  return (
    shouldRender && (
      <div
        className={className}
        style={{
          animation: `${shown ? 'fade-in' : 'fade-out'} 1s`,
        }}
        onAnimationEnd={onAnimationEnd}>
        {children}
      </div>
    )
  );
}
