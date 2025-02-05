import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import InvoiceViewPage from '@/features/invoices/components/invoices-view-page';

export const metadata = {
  title: 'Dashboard : Invoice View'
};

type PageProps = { params: Promise<{ invoiceId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <InvoiceViewPage invoiceId={params.invoiceId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
