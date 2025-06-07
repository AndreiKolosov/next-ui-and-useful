import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface HookProps {
  destroyImmediately?: boolean;
  destroyTimeout?: number; // ms
  onAfterUnmount?: () => void;
}

const useModalState = (props?: HookProps) => {
  const { destroyImmediately = false, destroyTimeout = 300, onAfterUnmount } = props || {};
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupName = useSearchParams().get('modal');
  const [mountedPopup, setMountedPopup] = useState<string | null>(popupName);

  const isModalOpened = popupName !== null; // useMemo здесь избыточен

  useEffect(() => {
    if (popupName) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setMountedPopup(popupName);
    } else {
      timeoutRef.current = setTimeout(
        () => {
          setMountedPopup(null);
          onAfterUnmount?.();
        },
        destroyImmediately ? 0 : destroyTimeout,
      );
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [popupName, destroyImmediately, destroyTimeout, onAfterUnmount]); // все зависимости явные

  return { mountedPopup, isModalOpened };
};

export { useModalState };
