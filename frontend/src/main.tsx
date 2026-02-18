import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <App />

      </Provider>
    </LocalizationProvider>

    </StrictMode>
  </BrowserRouter>,
)
