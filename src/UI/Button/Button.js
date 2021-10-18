import React from 'react';

import styles from './Button.module.css';

const Button = React.forwardRef((props, ref) => {
  return (
    <button
      className={`${props.className ?? ''} ${styles.button}`}
      type="button"
      onClick={props.onClick}
      ref={ref}
    >
      {props.children}
    </button>
  );
});

export default Button;
