import { useRef } from "react";

export function useLongPress(delay = 300) {
  const timer = useRef(null);
  const firedLong = useRef(false);

  const start = (e, onLong) => {
    firedLong.current = false;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      firedLong.current = true;
      onLong?.(e);
      timer.current = null;
    }, delay);
  };

  const finish = (e, onShort) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;

      if (!firedLong.current) onShort?.(e); // короткий клік
    }
  };

  const abort = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    firedLong.current = false;
  };

  return (onShort, onLong) => ({
    onMouseDown: (e) => start(e, onLong),
    onMouseUp: (e) => finish(e, onShort),
    onMouseLeave: abort,
    onTouchStart: (e) => start(e, onLong),
    onTouchEnd: (e) => finish(e, onShort),
    onTouchCancel: abort,
  });
}
