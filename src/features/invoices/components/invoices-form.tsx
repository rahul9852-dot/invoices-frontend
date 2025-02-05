'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Invoice } from '@/constants/mock-api';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const SELECT_CUSTOMER_NAME = [
  {
    value: 'vivek',
    label: 'Vivek'
  },
  {
    value: 'rahul',
    label: 'Rahul'
  },
  {
    value: 'vishwajeet',
    label: 'Vishwajeet'
  }
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Invoice name must be at least 2 characters.'
  }),
  status: z.enum(['pending', 'paid', 'failed']).default('pending').optional(),
  price: z.number(),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1.' })
    .default(1),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  customer: z.string()
});

export default function ProductForm({
  initialData,
  pageTitle,
  readOnly = false
}: {
  initialData: Invoice | null;
  pageTitle: string;
  readOnly?: boolean;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    quantity: initialData?.quantity || 1,
    status: (initialData?.status || 'pending') as 'pending' | 'paid' | 'failed',
    customer: SELECT_CUSTOMER_NAME[0].value
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const val = form.getValues().status as string;

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-left text-2xl font-bold'>
          {pageTitle}{' '}
          {readOnly ? (
            <span
              className={cn('rounded-sm px-2 py-1 text-xs uppercase', {
                'bg-green-500/10 text-green-500': val === 'paid',
                'bg-red-500/10 text-red-500': val === 'failed',
                'bg-yellow-500/10 text-yellow-500': val === 'pending'
              })}
            >
              {val}
            </span>
          ) : (
            ''
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                disabled={readOnly}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter invoice name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='customer'
                disabled={readOnly}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      defaultValue={SELECT_CUSTOMER_NAME[0].value}
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select customer' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SELECT_CUSTOMER_NAME.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                disabled={readOnly}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter invoice description'
                        className='resize-none'
                        defaultValue={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                disabled={readOnly}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        min={0.01}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quantity'
                disabled={readOnly}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <Input type='number' min={1} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!readOnly && <Button type='submit'>Add Invoice</Button>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
