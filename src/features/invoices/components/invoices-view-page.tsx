import { fakeInvoices, Invoice } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import InvoiceForm from './invoices-form';

type TInvoiceViewPageProps = {
  invoiceId: string;
};

export default async function InvoiceViewPage({
  invoiceId
}: TInvoiceViewPageProps) {
  let invoice = null;
  let pageTitle = 'Create New Invoice';

  if (invoiceId !== 'new') {
    const data = await fakeInvoices.getInvoiceById(Number(invoiceId));
    invoice = data.invoice as Invoice;
    if (!invoice) {
      notFound();
    }
    pageTitle = `Invoice Details #${invoiceId}`;

    return <InvoiceForm initialData={invoice} pageTitle={pageTitle} readOnly />;
  }

  return <InvoiceForm initialData={invoice} pageTitle={pageTitle} />;
}
