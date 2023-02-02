import { Typography } from '@mui/material';
import { FC, memo, ReactNode } from 'react';

interface ITitle {
  children: ReactNode;
}

const Title: FC<ITitle> = memo(({ children }) => {
  return (
    <Typography variant="h4" color="secondary" textAlign="center">
      {children}
    </Typography>
  );
});
export default Title;
