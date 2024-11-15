'use client';

import { useState, useCallback, ReactNode } from 'react';

// components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FilterComboBox from '@/components/FilterComboBox';

// redux
import { useDispatch } from 'react-redux';
import { addHotel, editHotel } from '@/redux/HotelReducer';

// form
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

// utils
import { Category } from '@/lib/data/categories';
import { Hotel } from '@/lib/data/hotel_data';

export const CreateHotelSchema = z
  .object({
    name: z.string(),
    country: z.string(),
    address: z.string(),
    category: z.string(),
  })
  .required();

export type CreateHotelSchemaType = z.infer<typeof CreateHotelSchema>;

interface Props {
  trigger: ReactNode;
  hotel?: Hotel;
}

export default function AddHotelDialog({ trigger, hotel }: Props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateHotelSchemaType>({
    resolver: zodResolver(CreateHotelSchema),
    defaultValues: {
      name: hotel?.name || '',
      country: hotel?.country || '',
      address: hotel?.address || '',
      category: hotel?.category || '',
    },
  });

  const handleCategoryChange = useCallback(
    (category: Category) => {
      form.setValue('category', category.value);
    },
    [form]
  );

  function onSubmit(data: CreateHotelSchemaType) {
    
    setIsLoading(true);

    try {
      if (hotel) {
        // editing an existing hotel
        dispatch(editHotel({
          id: hotel.id,
          updatedHotel: {
            ...data,
          }
        }));
      } else {
        // creating a new hotel
        dispatch(addHotel(data));
      }

      setTimeout(() => {
          toast({
            title: 'Success',
            description: `Hotel ${hotel ? 'updated' : 'created'} successfully`,
          });
          setIsLoading(false);
        setOpen(false);
        }, 2000);

        form.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='p-12'>
        {/* <div className='px-6'> */}
        <DialogHeader>
          <div className='my-12'>
            <DialogTitle className='text-4xl font-bold'>
              {hotel ? 'Edit Hotel' : 'Create a new Hotel'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-2xl'>Name</FormLabel>
                  <FormControl>
                    <div className='flex items-center justify-center w-full h-full'>
                      <Input
                        type='text'
                        // defaultValue={field.value}
                        {...field}
                        className='bg-background focus-visible:ring-offset-0 rounded-lg w-full h-12 px-4 md:text-xl'
                      />
                    </div>
                  </FormControl>
                  <FormDescription className='text-xl'>
                    Hotel name (required)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-2xl'>Country</FormLabel>
                  <FormControl>
                    <div className='flex items-center justify-center w-full h-full'>
                      <Input
                        type='text'
                        // defaultValue={field.value}
                        {...field}
                        className='bg-background focus-visible:ring-offset-0 rounded-lg w-full h-12 px-4 md:text-xl'
                      />
                    </div>
                  </FormControl>
                  <FormDescription className='text-xl'>
                    Please input a country
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-2xl'>Address</FormLabel>
                  <FormControl>
                    <div className='flex items-center justify-center w-full h-full'>
                      <Input
                        type='text'
                        // defaultValue={field.value}
                        {...field}
                        className='bg-background focus-visible:ring-offset-0 rounded-lg w-full h-12 px-4 md:text-xl'
                      />
                    </div>
                  </FormControl>
                  <FormDescription className='text-xl'>
                    Please provide an address
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-2xl'>Category</FormLabel>
                  <FormControl>
                    <FilterComboBox value={hotel?.category} onChange={handleCategoryChange} />
                  </FormControl>
                  <FormDescription className='text-xl'>
                    Select a category for this hotel
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className='mt-12'>
          <DialogClose asChild>
            <Button
              type='button'
              className='text-xl'
              variant={'secondary'}
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className='text-xl mb-6 sm:mb-0 sm:mr-12'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : hotel ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}