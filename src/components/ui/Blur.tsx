import React from 'react';
import { animated, SpringConfig, useTransition } from 'react-spring';

interface Props {
  children: React.ReactNode;
  className?: string;
  config?: SpringConfig;
  shown: boolean;
}

function Blur({ children, className, config, shown }: Props): any {
  const transitions = useTransition(shown, null, {
    from: { opacity: 0, filter: 'blur(20px)' },
    enter: { opacity: 1, filter: 'blur(0)' },
    leave: { opacity: 0, filter: 'blur(20px)' },
    config,
  });
  return transitions.map(
    ({ item, key, props }): React.ReactNode => {
      return item ? (
        <animated.div key={key} className={className} style={props}>
          {children}
        </animated.div>
      ) : null;
    },
  );
}

export default Blur;
