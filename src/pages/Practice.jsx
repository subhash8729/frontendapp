import React from 'react';
import { create } from 'zustand';

// Zustand store
const useCounterStore = create((set) => ({
  count: 0,
  othercount : 0,
  increment: () => set((state) => ({ othercount: state.othercount + 1 })),
  decrement: () => set((state) => ({ othercount: state.othercount - 1 })),
}));

const Practice = () => {
  const { othercount, increment, decrement } = useCounterStore();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Count: {othercount}</h1>
      <button onClick={increment} style={{ marginRight: '10px' }}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Practice;
