import { Button } from '@/components/ui/button';
import ShowCategoriesDialog from '@/components/ShowCategoriesDialog';

function Navbar() {
  return (
    <nav className='flex flex-col md:flex-row md:justify-between bg-background items-center h-24 my-12 rounded-3xl px-12 py-6  font-bold'>
      <p className='text-5xl'>Hotels Ranking</p>
      <div className=''>
        <ShowCategoriesDialog
            trigger={
              <Button
                variant='outline'
                className='text-xl cursor-pointer'
              >
                Manage Categories
              </Button>
            }
          />
      </div>
    </nav>
  );
}

export default Navbar;
