'use client';
import { Invoice } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },
  {
    accessorKey: 'quantity',
    header: 'QUANTITY'
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => {
      const val = row.getValue('status') as string;
      return (
        <span
          className={cn('rounded-sm px-2 py-1 text-xs uppercase', {
            'bg-green-500/10 text-green-500': val === 'paid',
            'bg-red-500/10 text-red-500': val === 'failed',
            'bg-yellow-500/10 text-yellow-500': val === 'pending'
          })}
        >
          {val}
        </span>
      );
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
