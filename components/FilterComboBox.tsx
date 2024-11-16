'use client';

import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Delete } from 'lucide-react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '@/redux/HotelReducer';
import { RootState } from '@/store';

// lib
import { Category } from '@/lib/data/categories';

interface Props {
  value?: string | undefined;
  onChange?: (category: Category) => void;
}

export default function FilterComboBox({ onChange, value }: Props) {
  // list of categories
  const categories = useSelector((state: RootState) => state.hotel.categories);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const defaultValue = value
    ? categories.find((category: Category) => category.value === value)
    : null;

  const [selectedOption, setSelectedOption] = React.useState<Category | null>(
    defaultValue!
  );

  useEffect(() => {
    if (!selectedOption) return;
    if (onChange) {
      // if creating a new hotel
      onChange(selectedOption);
    } else {
      // when filtering by category
      dispatch(setCategoryFilter(selectedOption?.value));
    }
  }, [onChange, dispatch, selectedOption]);

  return (
    <div className='flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full md:text-xl justify-start h-12 cursor-pointer'
          >
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>Filter by category</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[30rem] p-0' align='start'>
          <OptionsList
            categories={categories}
            setOpen={setOpen}
            setSelectedOption={setSelectedOption}
          />
        </PopoverContent>
      </Popover>

      {!onChange && (
        <Button
          className='ml-3 text-xl h-12'
          onClick={() => {
            setSelectedOption(null);
            dispatch(setCategoryFilter(''));
          }}
        >
          <Delete />
        </Button>
      )}
    </div>
  );
}

function OptionsList({
  categories,
  setOpen,
  setSelectedOption,
}: {
  categories: Category[];
  setOpen: (open: boolean) => void;
  setSelectedOption: (status: Category | null) => void;
}) {
  return (
    <Command>
      <CommandInput className='text-lg' placeholder='Filter category...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              className='text-xl'
              key={category.value}
              value={category.value}
              onSelect={(value) => {
                setSelectedOption(
                  categories.find((category) => category.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {category.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
