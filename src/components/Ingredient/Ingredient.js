import React, { useCallback, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../../UI';
import { OrderContext } from '../../store';
import styles from './Ingredient.module.css';

const Ingredient = (props) => {
  const orderCtx = useContext(OrderContext);
  const inputRef = useRef(0);

  const { title, price, description } = props;
  const idRef = useRef(uuidv4());

  const add_ingredient = useCallback(() => {
    const amount = inputRef.current.value;

    const user = {
      title,
      price,
      description,
      id: idRef.current,
      amount: amount ? parseInt(amount) : 0,
    };

    orderCtx.add_user(user);
  }, [title, price, description, orderCtx]);

  return (
    <>
      <div className={styles.ingredient}>
        <div>
          <h3>{props.title}</h3>
          <p>
            <em>{props.description}</em>
          </p>
          <p className={styles.price}>${props.price.toFixed(2)}</p>
        </div>

        <div
          className={`${styles['center-align']} ${styles.horizontalLeftAlign}`}
        >
          <div className={styles.input}>
            <label htmlFor="amount_1">Amount </label>
            <input
              type="number"
              name="amount_1"
              id={idRef}
              ref={inputRef}
              defaultValue="0"
              min="0"
            />
          </div>
          <Button onClick={add_ingredient}>Add</Button>
        </div>
      </div>
      <hr className={styles.horizontalLine} />
    </>
  );
};

export default Ingredient;
