import React, { useContext, useRef, useEffect } from 'react';
import { OrderContext } from '../../store';
import { Button } from '../Button';
import { Card } from '../Card';

import styles from './Modal.module.css';

const Modal = (props) => {
  const orderCtx = useContext(OrderContext);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const firstElementRef = useRef(null);
  const lastElementRef = useRef(null);
  // const [shouldTakeFocus, setShouldTakeFocus] = useState(false);

  useEffect(() => {
    function focusTrap(event) {
      if (event.target === topRef.current) {
        lastElementRef.current.focus();
      }

      if (event.target === bottomRef.current) {
        firstElementRef.current.focus();
      }
    }

    function handleEscPressed(event) {
      if (event.keyCode === 27) {
        props.closeModal();
      }
    }

    // if (firstElementRef.current) {
    //   firstElementRef.current.focus();
    // }
    firstElementRef.current.focus();

    document.addEventListener('keydown', handleEscPressed);
    document.addEventListener('focusin', focusTrap);
    return () => {
      document.removeEventListener('focusin', focusTrap);
      document.removeEventListener('keydown', handleEscPressed);
    };
  }, [orderCtx.order.value.length, props]);

  const order_func = () => {
    console.log('clicking order button');
  };

  return (
    <>
      <div className={styles.modalBackground} onClick={props.closeModal} />

      <Card className={styles.modal}>
        <span ref={topRef} tabIndex="0" />
        {orderCtx.order.value.map((curr, idx) => (
          <div key={curr.title}>
            <div className={styles.order}>
              <div className={styles.leftColumn}>
                <h2>{curr.title}</h2>
                <p className={styles.price}>${curr.price.toFixed(2)}</p>
                <p>{curr.amount}</p>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => orderCtx.decrease_order_quantity(curr.id)}
                  ref={idx === 0 ? firstElementRef : undefined}
                  // ref={(input) => {
                  //   if (idx === 0 && input) {
                  //     firstElementRef.current = input;
                  //     setShouldTakeFocus(true);
                  //     input.focus();
                  //   }
                  // }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => orderCtx.increase_order_quantity(curr.id)}
                >
                  +
                </button>
              </div>
            </div>
            <hr className={styles.horizontalLine} />
          </div>
        ))}

        <footer className={styles.modalFooter}>
          <div className={styles.totalAmountWrapper}>
            <h3>Total Amount</h3>
            <h3>${orderCtx.order.totalAmount.toFixed(2)}</h3>
          </div>

          <div className={styles.buttonGroup}>
            <Button onClick={props.closeModal} className={styles.footerButton}>
              Close
            </Button>
            <Button
              onClick={order_func}
              className={styles.footerButton}
              ref={lastElementRef}
            >
              Order
            </Button>
          </div>
        </footer>
        <span ref={bottomRef} tabIndex="0" />
      </Card>
    </>
  );
};

export default Modal;
