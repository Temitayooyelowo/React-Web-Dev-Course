import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';
import { OrderContext } from '../../store';

const Header = (props) => {
  const orderCtx = useContext(OrderContext);

  console.log({ orderCtx });

  return (
    <header className={styles.Header}>
      <h1 className={styles.title}>
        <a
          aria-label="React Meals - return to top of page."
          href="/#"
        >
          ReactMeals
        </a>
      </h1>

      <button
        className={`${styles.button} ${styles.alignHeader}`}
        onClick={props.onClick}
        disabled={orderCtx.order.numOrders === 0}
      >
        <FontAwesomeIcon icon={faShoppingCart} /> Your cart
        <span className={styles.numOrders}>
          {orderCtx.order.numOrders || 0}
        </span>
      </button>
    </header>
  );
};

export default Header;
