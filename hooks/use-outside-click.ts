import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
  isActive: boolean = true, // Добавляем флаг активности
) => {
  const callbackRef = useRef(callback);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const handler = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isActiveRef.current) return; // Игнорируем если не активно
      const target = ref.current;
      if (target && !target.contains(event.target as Node)) {
        callbackRef.current(event);
      }
    },
    [ref],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isActive) {
        document.addEventListener('click', handler);
      } else {
        document.removeEventListener('click', handler);
      }
      return () => {
        document.removeEventListener('click', handler);
      };
    }
  }, [handler, isActive]);
};
