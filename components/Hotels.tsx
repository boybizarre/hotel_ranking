'use client';

// components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import AddHotelDialog from '@/components/AddHotelDialog';
import DeleteHotelDialog from '@/components/DeleteHotelDialog';

import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '@/redux/HotelReducer';
import { RootState } from '@/store';

import { Hotel } from '@/lib/data/hotel_data';
import { FaEdit, FaTrash } from 'react-icons/fa';

// data
import { HotelsData } from '@/lib/data/hotel_data';

export default function Hotels() {
  const hotels = useSelector((state: RootState) => state.hotel.hotels);

  const searchTerm = useSelector((state: RootState) => state.hotel.searchTerm);

  const categoryFilter = useSelector(
    (state: RootState) => state.hotel.categoryFilter
  );

  console.log('categoryFilter: ', categoryFilter);
  
  // Filter hotels based on searchTerm and categoryFilter
  const filteredHotels = hotels.filter((hotel: Hotel) => {
    const matchesSearch = searchTerm
      ? hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = categoryFilter
      ? hotel.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  console.log('filteredHotels', filteredHotels);

  return (
    <div className='my-12 w-full rounded pt-8 gap-x-8 gap-y-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      {filteredHotels.map((hotel: Hotel) => (
        <div
          key={hotel.id}
          className='flex flex-col justify-between bg-background min-h-[20rem] rounded-2xl shadow-md'
        >
          <CardHeader className='flex  pb-2'>
            <CardTitle className='text-4xl font-bold'>{hotel.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mt-12'>
              <h4 className='text-2xl'>{hotel.country}</h4>
              <p className='text-xl text-muted-foreground'>{hotel.address}</p>
              <p className='text-xl font-bold'>
                Category:{' '}
                <span className='text-muted-foreground font-bold'>
                  {hotel.category}
                </span>
              </p>
            </div>

            <div className='mt-12 flex w-full gap-6'>
              <AddHotelDialog
                hotel={hotel}
                trigger={
                  <Button
                    asChild
                    className='w-full mt-2 text-md gap-4'
                    variant='secondary'
                  >
                    <FaEdit className='h-6 w-6 cursor-pointer' />
                  </Button>
                }
              />
              <DeleteHotelDialog
                hotel={hotel}
                trigger={
                  <Button
                    asChild
                    className='w-full mt-2 text-md gap-4'
                    variant='secondary'
                  >
                    <FaTrash className='h-6 w-6 cursor-pointer' />
                  </Button>
                }
              />
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  );
}
