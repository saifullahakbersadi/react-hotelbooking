import { use, useState } from 'react';
import GuestCounter from '../../atoms/GuestCounter';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSearchHotels } from '../../../hooks/useSearchHotels';

type setHotelListProps = {
  setHotelList: (hotels: any) => void
}
type BookingFormState = {
  location: string;
  guestsNumber: number;
  bookingDateConfirm: [Dayjs | null, Dayjs | null];
};

function HotelSearchForm({setHotelList} : setHotelListProps) {

  const [form, setForm] = useState<BookingFormState>({
    location: '',
    guestsNumber: 1,
    bookingDateConfirm: [dayjs(), dayjs().add(1, "day")],
  });
  const [bookingDate, setBookingDate] = useState<[Dayjs | null, Dayjs | null]>([
     null, null
    ]);

  const { searchedHotels } = useSearchHotels(
    form.location,
    bookingDate[0] ? bookingDate[0].toDate() : new Date(),
    bookingDate[1] ? bookingDate[1].toDate() : new Date(),
    form.guestsNumber
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  }
  const handleGuestChange = (value: number) => {
    setForm(() => ({ ...form, guestsNumber: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ ...form, bookingDateConfirm: bookingDate });
    setHotelList(searchedHotels);
    console.log('Form submitted:', searchedHotels);
  }

  return (
    <Box pt={4} px={{ xs: 1, sm: 2, md: 4 }} display="flex" justifyContent="center" alignItems="center" minHeight="100%">
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box mb={2}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Location field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                onChange={handleChange}
                required={true}
              />
            </Grid>
            {/* Date range picker */}
            <Grid item xs={12} sm={6}>
              <Box width="100%">
                <DateRangePicker
                  value={bookingDate}
                  onChange={(newValue) => setBookingDate(newValue)}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                  sx={{ width: '100%' }}
                />
              </Box>
            </Grid>
            {/* Guest counter */}
            <Grid item xs={12} sm={6}>
              <Box width="100%">
                <GuestCounter
                  value={form.guestsNumber}
                  onChange={handleGuestChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box width="100%">
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ height: '56px' }} onClick={handleSubmit}>
                  SEARCH
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  )
}

export default HotelSearchForm

function useSearchHotel(p0: string, p1: dayjs.Dayjs, p2: dayjs.Dayjs): { searchedHotels: any; } {
  throw new Error('Function not implemented.');
}
