'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' }
];

export function useInvoiceTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [invoicesFilter, setInvoicesFilter] = useQueryState(
    'status',
    searchParams.status.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setInvoicesFilter(null);

    setPage(1);
  }, [setSearchQuery, setInvoicesFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!invoicesFilter;
  }, [searchQuery, invoicesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    invoicesFilter,
    setInvoicesFilter
  };
}
