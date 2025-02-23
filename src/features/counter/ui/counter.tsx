"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks";
import { selectCount } from "../model/selectors";
import { decrement, increment } from "../model/slice";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => dispatch(increment())}>
        +
      </button>
      <span>{count}</span>
      <button type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
    </div>
  );
}
