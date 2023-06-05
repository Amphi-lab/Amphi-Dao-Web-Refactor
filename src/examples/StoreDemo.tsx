import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from '@/store/reducers/counterSlice';

export default function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div style={{ margin: '30px 0' }}>
            <div style={{ margin: '15px 0' }}>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}> - </button>
                <span>{count}</span>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}> + </button>
            </div>
            <div style={{ margin: '15px 0' }}>
                <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)} />
                <button onClick={() => dispatch(incrementByAmount(incrementValue))}> Add Amount </button>
                <button onClick={() => dispatch(incrementAsync(incrementValue))}> Add Async </button>
                <button onClick={() => dispatch(incrementIfOdd(incrementValue))}> Add If Odd </button>
            </div>
        </div>
    );
}
