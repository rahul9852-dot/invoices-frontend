import { Invoice } from '@/constants/data';
import { fakeInvoices } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as InvoiceTable } from '@/components/ui/table/data-table';
import { columns } from './invoices-tables/columns';

type InvoiceListingPage = {};

export default async function InvoiceListingPage({}: InvoiceListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const status = searchParamsCache.get('status') as
    | 'pending'
    | 'paid'
    | 'failed';

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status: status })
  };

  const data = await fakeInvoices.getInvoices(filters);
  const totalProducts = data.total_invoices;
  const invoices: Invoice[] = data.invoices;

  return (
    <InvoiceTable
      columns={columns}
      data={invoices}
      totalItems={totalProducts}
    />
  );
}
