'use client';

import { ReactNode } from 'react';
import { toast } from '../hooks/use-toast';

import { Hotel } from '@/lib/data/hotel_data';

import { useDispatch } from 'react-redux';

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

import { deleteHotel } from '@/redux/HotelReducer';

interface Props {
  hotel: Hotel;
  trigger: ReactNode;
}

export default function DeleteDialog({
  hotel,
  trigger,
}:
Props) {

  const dispatch = useDispatch();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-3xl font-bold'>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-xl text-muted-foreground'>
            This action cannot be undone. This will permanently delete <span className='font-bold text-foreground'>{hotel.name}</span> hotel
            </AlertDialogDescription>
          </AlertDialogHeader>

        <AlertDialogFooter className='mt-12'>
          <AlertDialogCancel className='text-xl'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='text-xl'
            onClick={() => {
              setTimeout(() => {
                dispatch(deleteHotel(hotel.id));
                toast({
                  title: 'Deleted',
                  description: `Deleted ${hotel.name}`,
                });
              },2000)
            }}
          >
            Continue
          </AlertDialogAction>
          
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}
