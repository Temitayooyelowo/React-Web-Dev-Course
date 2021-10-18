import React from 'react';

import { Card } from '../../UI';
import styles from './Description.module.css';

const Description = (props) => {
  return (
    <Card className={`${styles.Card} ${styles['center-align']}`} >
      <div className={`${styles['card-inner']} ${styles['center-align']}`}>
        <h1>Delicious Food, Delivered to You</h1>

        <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or a dinner at home.</p>

        <p>All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!</p>
      </div>
    </Card>
  )
};

export default Description;