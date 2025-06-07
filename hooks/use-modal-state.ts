import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';

interface HookProps {
  destroyImmediately?: boolean;
  destroyTimeout?: number; // ms
  onAfterUnmount?: () => void;
}

const useModalState = (props?: HookProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { destroyImmediately = false, destroyTimeout = 300 } = props || {};

  const popupName = useSearchParams().get('modal');
  const [mountedPopup, setMountedPopup] = useState<string | null>(popupName);

  const isModalOpened = useMemo(() => Boolean(popupName), [popupName]);

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
          if (props?.onAfterUnmount) {
            props.onAfterUnmount();
          }
        },
        destroyImmediately ? 0 : destroyTimeout,
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupName]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    mountedPopup,
    isModalOpened,
  };
};

export { useModalState };
