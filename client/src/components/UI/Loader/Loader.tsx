import { Backdrop, CircularProgress } from '@mui/material';
import { FC, memo } from 'react';

interface ILoader {
  isOpen: boolean;
}

const Loader: FC<ILoader> = memo(({ isOpen }) => {
  return (
    <Backdrop invisible sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <CircularProgress color="secondary" size={100} />
    </Backdrop>
  );
});
export default Loader;
