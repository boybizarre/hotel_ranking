'use client';

import React, { useEffect, useCallback } from 'react';

// import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '@/redux/HotelReducer';
import { RootState } from '@/store';

// lib
import { CATEGORIES, Category } from '@/lib/data/categories';

interface Props {
  onChange?: (category: Category) => void;
}

export default function FilterComboBox({ onChange }: Props) {

  // list of categories
  const categories = useSelector((state: RootState) => state.hotel.categories);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  // const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedOption, setSelectedOption] = React.useState<Category | null>(
    null
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
  }, [onChange, selectedOption]);

  console.log(selectedOption);

  return (
    <div className='flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full md:text-xl justify-start h-12 cursor-pointer'
            // disabled={mutation.isPending}
          >
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>Filter by category</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[30rem] p-0' align='start'>
          <OptionsList categories={categories} setOpen={setOpen} setSelectedOption={setSelectedOption} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function OptionsList({
  categories,
  setOpen,
  setSelectedOption,
}: {
  categories: Category[]
  setOpen: (open: boolean) => void;
  setSelectedOption: (status: Category | null) => void;
}) {
  return (
    <Command>
      <CommandInput className='text-lg' placeholder='Filter currency...' />
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
