'use client'
import { Modal } from '@/components/ui-kit/modal';
import { Modals } from '@/utils/constants';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Link href={`/?modal=${Modals.HELLO}`}>{'Open "Welcome" modal'}</Link>
      <Link href={`/?modal=${Modals.CONFIRM}`}>{'Open "Welcome" modal'}</Link>

      <Suspense fallback={null}>
        <Modal canBeOpened={true} modalName={Modals.HELLO}>
          <h1>Hi!</h1>
        </Modal>

        <Modal
          canBeOpened={true}
          modalName={Modals.CONFIRM}
          renderContent={(closeHandler) => {
            return (
            <div>
              <h1>Confirm modal</h1>
              <button type="button" onClick={() => {
                closeHandler()
              }}>
                Confirm and close
              </button>
            </div>
          )
          }}
        />
      </Suspense>
    </div>
  );
}
