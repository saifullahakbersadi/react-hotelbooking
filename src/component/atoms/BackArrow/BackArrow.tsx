import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function BackArrow({ text = "Back" }: { text?: string }) {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(-1)} color="primary">
      <ArrowBackIcon />  {text}
    </IconButton>
  );
}
