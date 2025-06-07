import { Modal } from '@/components/ui-kit/modal';
import { Modals } from '@/utils/constants';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Link href={`/?modal=${Modals.CONFIRM}`}>Open modal</Link>
      
      <Suspense fallback={null}>
        <Modal canBeOpened={true} modalName={Modals.CONFIRM}>
          <h1>Modal content</h1>
        </Modal>
      </Suspense>
    </div>
  );
}
