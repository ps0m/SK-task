import { ThemeProvider } from '@mui/material/styles';
import PhoneBook from './components/PhoneBook/PhoneBook';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PhoneBook />
    </ThemeProvider>
  );
}

export default App;
