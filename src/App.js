import React, { useCallback, useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Description, Header, Ingredient } from './components';
import styles from './App.module.css';
import { Card, Modal } from './UI';
import { OrderContext } from './store';

const meals = [
  {
    price: 22.9,
    title: 'Sushi',
    description: 'Finest fish and veggies',
    amount: 1,
  },
  {
    price: 16.5,
    title: 'Schnitzel',
    description: 'A german speciality',
    amount: 1,
  },
  {
    price: 12.99,
    title: 'Barbecue Burger',
    description: 'American, raw, meaty',
    amount: 1,
  },
  {
    price: 18.99,
    title: 'Green bowl',
    description: 'Healthy...and green...',
    amount: 1,
  },
];

function App() {
  const orderCtx = useContext(OrderContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const displayModal = isModalVisible && orderCtx.order.numOrders > 0;

  const toggleModalVisible = useCallback(() => {
    setModalVisible((prevVal) => !prevVal);
  }, []);

  useEffect(() => {
    if (orderCtx.order.numOrders === 0) {
      setModalVisible(false);
    }
  }, [orderCtx.order.numOrders]);

  return (
    <div className={styles.App}>
      <Header onClick={toggleModalVisible} />
      <main
        aria-hidden="true"
        className={`${styles.main} ${styles['center-align']}`}
      >
        <Description />
        <Card>
          {meals.map((meal) => (
            <Ingredient
              price={meal.price}
              title={meal.title}
              description={meal.description}
              amount={meal.amount}
              key={meal.title}
            />
          ))}
        </Card>
      </main>
      {displayModal &&
        ReactDOM.createPortal(
          <Modal closeModal={() => setModalVisible(false)} />,
          document.getElementById('modal-root')
        )}
    </div>
  );
}

export default App;
