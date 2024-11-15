'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

// redux
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '@/redux/HotelReducer';

// utils
import { useDebounce } from '@/hooks/useDebounce';

function Search() {

  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 500);
  
  // dispatch search action when the debounced value changes
  useEffect(() => {
    console.log('debounced value: ', debouncedValue);
    dispatch(setSearchTerm(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Input
        type='text'
        placeholder='Search for a hotel'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-background focus-visible:ring-offset-0 rounded-lg w-full h-12 px-4 md:text-xl'
      />
    </div>
  );
}

export default Search;
