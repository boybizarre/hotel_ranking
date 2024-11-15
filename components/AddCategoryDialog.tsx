'use client';

import { useState, ReactNode } from 'react';

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// form
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// redux
import { useDispatch } from 'react-redux';
import { addCategory, editCategory } from '@/redux/HotelReducer';

export const CreateCategorySchema = z
  .object({
    id: z.string(),
    value: z.string(),
  })
  .required();

interface Props {
  trigger: ReactNode;
  category?: {
    id: string,
    label: string;
    value: string;
  };
}

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export default function AddCategoryDialog({ trigger, category }: Props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      id: category?.id || '',
      value: category?.value || '',
    },
  });

  function onSubmit(data: CreateCategorySchemaType) {
    setIsLoading(true);

    try {
      if (category) {
        // editing an existing category
        dispatch(editCategory(data));
      } else {
        // creating a new category
        dispatch(addCategory(data.value));
      }

      setTimeout(() => {
        toast({
          title: 'Success',
          description: `Category ${
            category ? 'updated' : 'created'
          } successfully`,
        });
        setIsLoading(false);
      }, 2000);

      form.reset();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='p-12'>
        <DialogHeader>
          <div className='my-12'>
            <DialogTitle className='text-4xl font-bold'>
              {category ? 'Edit Category' : 'Create a new Category'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-2xl'>Category Name</FormLabel>
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
                    Input the name of the category you wish to create
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
            className='mr-6 text-xl'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='animate-spin' />
            ) : category ? (
              'Update'
            ) : (
              'Create'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
