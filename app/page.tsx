// components
import { Button } from '@/components/ui/button';

import Search from '@/components/Search';
import FilterComboBox from '@/components/FilterComboBox';
import Hotels from '@/components/Hotels';
import AddHotelDialog from '@/components/AddHotelDialog';
import AddCategoryDialog from '@/components/AddCategoryDialog';

export default function Home() {

  return (
    <>
      <div className='grid grid-cols-1 gap-6 min-h-24 px-12 py-6 bg-background rounded-3xl md:grid-cols-3'>
        {/* search */}
        <Search />

        {/* filter */}
        <FilterComboBox />

        {/* buttons */}
        <div className='flex items-center gap-6 mb-3 sm:my-auto h-12 w-full'>
          <AddHotelDialog
            trigger={
              <Button
                variant='outline'
                className='h-full w-full text-xl cursor-pointer'
              >
                Add Hotel
              </Button>
            }
          />

          <AddCategoryDialog
            trigger={
              <Button
                variant='outline'
                className='h-full w-full text-xl cursor-pointer'
              >
                Add Category
              </Button>
            }
          />
        </div>
      </div>

      {/* hotels card */}
      <div>
        <Hotels />
      </div>
    </>
  );
}
