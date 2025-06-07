'use client';

import { type FC, useEffect, ReactNode, useCallback } from 'react';
import styles from './modal.module.css';
import cn from 'classnames';
import { CrossIcon } from '@/components/icons/cross-icon';
import { usePathname, useRouter } from 'next/navigation';
import { Modals } from '@/utils/constants';
import { useModalState } from '@/hooks/use-modal-state';

interface ModalProps {
  onAfterClose?: () => void;
  modalName: Modals;
  canBeOpened: boolean;
  scrollOnClose?: boolean;
  children?: ReactNode;
  renderContent?: (closeHandler: () => void) => ReactNode;
}

const Modal: FC<ModalProps> = ({
  modalName,
  scrollOnClose = false,
  canBeOpened,
  children,
  onAfterClose,
  renderContent,
}) => {
  const { isModalOpened, mountedPopup } = useModalState({ onAfterUnmount: onAfterClose });

  const pathname = usePathname();
  const router = useRouter();

  const closeHandler = useCallback(
    () => router.push(pathname, { scroll: scrollOnClose }),
    [pathname, router, scrollOnClose],
  );

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };

    if (canBeOpened && mountedPopup === modalName) {
      document.addEventListener('keydown', closeModalByEsc);

      return () => {
        document.removeEventListener('keydown', closeModalByEsc);
      };
    }
  }, [canBeOpened, closeHandler, modalName, mountedPopup]);

  const content = renderContent ? renderContent(closeHandler) : children;

  return (
    <>
      {canBeOpened && mountedPopup === modalName && (
        <div
          className={cn(styles.modal, { [styles.modal_isClosing]: !isModalOpened })}
          role="dialog"
          aria-modal="true"
          onClick={closeHandler}
        >
          <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
            {content}
            
            <button
              className={styles.modal__closeBtn}
              type="button"
              title="Закрыть модальное окно"
              aria-label="Закрыть модальное окно"
              onClick={closeHandler}
            >
              <CrossIcon className={styles.modal__closeIcon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
