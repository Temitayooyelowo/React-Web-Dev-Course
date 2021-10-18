import React, { useReducer, useEffect } from 'react';

const ACTION_TYPE = {
  ADD_ORDER: 1,
  REMOVE_ORDER: 2,
  INCREMENT_QUANTITY: 3,
  DECREMENT_QUANTITY: 4,
};

const OrderContext = React.createContext({
  order: [],
  add_user: (user) => {},
  remove_user: (id) => {},
  increase_order_quantity: (id) => {},
  decrease_order_quantity: (id) => {},
});

const orderReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_ORDER: {
      const unique_state = state.value.filter(
        (curr) => curr.id !== action.val.id
      );
      const new_value = [...unique_state, { ...action.val }];
      const numOrders = new_value.reduce((acc, curr) => acc + curr.amount, 0);
      const totalAmount = new_value.reduce((acc, curr) => {
        return acc + curr.amount * curr.price;
      }, 0);

      console.log({ totalAmount });

      return {
        value: new_value,
        numOrders,
        totalAmount,
      };
    }
    case ACTION_TYPE.REMOVE_ORDER: {
      const new_value = state.value.filter((curr) => curr.id !== action.id);
      const numOrders = new_value.reduce((acc, curr) => acc + curr.amount, 0);
      const totalAmount = new_value.reduce((acc, curr) => {
        return acc + curr.amount * curr.price;
      }, 0);

      return {
        value: new_value,
        numOrders,
        totalAmount,
      };
    }
    case ACTION_TYPE.INCREMENT_QUANTITY: {
      // const new_value = state.value.filter((curr) => curr.id !== action.id);
      const new_value = [];
      for (let i = 0; i < state.value.length; i++) {
        const curr = state.value[i];
        if (action.id !== curr.id) {
          new_value.push(curr);
        } else {
          new_value.push({
            ...curr,
            amount: curr.amount + 1,
          });
        }
      }
      const numOrders = new_value.reduce((acc, curr) => acc + curr.amount, 0);
      const totalAmount = new_value.reduce((acc, curr) => {
        return acc + curr.amount * curr.price;
      }, 0);

      return {
        value: new_value,
        numOrders,
        totalAmount,
      };
    }
    case ACTION_TYPE.DECREMENT_QUANTITY: {
      const new_value = [];
      for (let i = 0; i < state.value.length; i++) {
        const curr = state.value[i];
        if (action.id !== curr.id) {
          new_value.push(curr);
        } else if (curr.amount !== 1) {
          new_value.push({
            ...curr,
            amount: curr.amount - 1,
          });
        }
      }
      console.log({ new_value });
      const numOrders = new_value.reduce((acc, curr) => acc + curr.amount, 0);
      const totalAmount = new_value.reduce((acc, curr) => {
        return acc + curr.amount * curr.price;
      }, 0);

      return {
        value: new_value,
        numOrders,
        totalAmount,
      };
    }
    default: {
      return state;
    }
  }
};

export const OrderContextProvider = (props) => {
  const [orderState, dispatchOrder] = useReducer(orderReducer, {
    value: [],
    numOrders: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    console.log(orderState);
  }, [orderState]);

  const add_user = (user) => {
    console.log('Adding a user');
    dispatchOrder({ type: ACTION_TYPE.ADD_ORDER, val: user });
  };

  const remove_user = (id) => {
    console.log('Removing a user');
    dispatchOrder({ type: ACTION_TYPE.REMOVE_ORDER, id });
  };

  const increase_order_quantity = (id) => {
    console.log('Increasing order quantity');
    dispatchOrder({ type: ACTION_TYPE.INCREMENT_QUANTITY, id });
  };

  const decrease_order_quantity = (id) => {
    console.log('Decreasing order quantity');
    dispatchOrder({ type: ACTION_TYPE.DECREMENT_QUANTITY, id });
  };

  return (
    <OrderContext.Provider
      value={{
        order: orderState,
        add_user,
        remove_user,
        increase_order_quantity,
        decrease_order_quantity,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
