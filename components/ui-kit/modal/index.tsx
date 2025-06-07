'use client';

import { type FC, useEffect, ReactNode, useCallback } from 'react';
import styles from './modal.module.css';
import cn from 'classnames';
import { CrossIcon } from '@/components/icons/cross-icon';
import { usePathname, useRouter } from 'next/navigation';
import { Modals } from '@/utils/constants';
import { useModalState } from '@/hooks/use-modal-state';

interface ModalProps {
  modalId: Modals;
  canBeRendered: boolean;
  scrollOnClose?: boolean;
  children?: ReactNode;
  destroyImmediately?: boolean;
  onAfterClose?: () => void;
  renderContent?: (closeHandler: () => void) => ReactNode;
}

const Modal: FC<ModalProps> = ({
  modalId,
  scrollOnClose = false,
  canBeRendered,
  destroyImmediately,
  children,
  onAfterClose,
  renderContent,
}) => {
  const { isModalOpened, mountedPopup } = useModalState({ onAfterUnmount: onAfterClose, destroyImmediately });

  const pathname = usePathname();
  const router = useRouter();

  const closeHandler = useCallback(
    () => router.push(pathname, { scroll: scrollOnClose }),
    [pathname, router, scrollOnClose],
  );

  const content = renderContent ? renderContent(closeHandler) : children;

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };

    if (canBeRendered && mountedPopup === modalId) {
      document.addEventListener('keydown', closeModalByEsc);

      return () => {
        document.removeEventListener('keydown', closeModalByEsc);
      };
    }
  }, [canBeRendered, closeHandler, modalId, mountedPopup]);

  return (
    <>
      {canBeRendered && mountedPopup === modalId && (
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
