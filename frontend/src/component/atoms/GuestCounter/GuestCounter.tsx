import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type GuestCounterProps = {
    value: number;
    onChange?: (value: number) => void;
}
const GuestCounter = ({value, onChange}: GuestCounterProps) => {

  const increment = () => onChange?.(value + 1);
  const decrement = () => onChange?.(Math.max(1, value - 1));

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography>Total Guests</Typography>
      <IconButton onClick={decrement} color="primary">
        <RemoveIcon />
      </IconButton>
      <TextField
        value={value}
        inputProps={{ style: { textAlign: "center" }, readOnly: true }}
        size="small"
        style={{ width: 50 }}
      />
      <IconButton onClick={increment} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default GuestCounter;
