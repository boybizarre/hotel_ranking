'use client';

import React, { useState } from 'react';

// components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddCategoryDialog from '@/components/AddCategoryDialog';
import DeleteCategoryDialog from '@/components/DeleteCategoryDialog';

import { FaEdit, FaTrash } from 'react-icons/fa';

import { Category } from '@/lib/data/categories'; // Your categories data

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  trigger: React.ReactNode;
}

export default function ShowCategoriesDialog({ trigger }: Props) {
  const categories = useSelector((state: RootState) => state.hotel.categories);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='p-12'>
        <DialogHeader className='my-12'>
          <DialogTitle className='text-4xl font-semibold'>
            Categories
          </DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          {categories.map((category: Category) => (
            <div
              key={category.value}
              className='flex justify-between items-center mb-4'
            >
              <span className='text-lg'>{category.label}</span>
              <div className='flex gap-4'>
                <AddCategoryDialog
                  category={category}
                  trigger={
                    <Button variant='secondary'>
                      <FaEdit className='h-5 w-5' />
                      Update
                    </Button>
                  }
                />
                <DeleteCategoryDialog
                  category={category}
                  trigger={
                    <Button variant='destructive'>
                      <FaTrash className='h-5 w-5' />
                      Delete
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
