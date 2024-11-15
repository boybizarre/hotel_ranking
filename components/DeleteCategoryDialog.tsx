'use client';

import { ReactNode } from 'react';
import { toast } from '../hooks/use-toast';

import { Category } from '@/lib/data/categories';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// redux
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/redux/HotelReducer';

interface Props {
  category: Category;
  trigger: ReactNode;
}

export default function DeleteDialog({ category, trigger }: Props) {
  const dispatch = useDispatch();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-3xl font-bold'>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-xl text-muted-foreground'>
            This action cannot be undone. This will permanently delete{' '}
            <span className='font-bold text-foreground'>{category.label}</span>{' '}
            category
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='mt-12'>
          <AlertDialogCancel className='text-xl'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='text-xl'
            onClick={() => {
              setTimeout(() => {
                dispatch(deleteCategory(category.id));
                toast({
                  title: 'Deleted',
                  description: `Deleted ${category.label}`,
                });
              }, 2000);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
