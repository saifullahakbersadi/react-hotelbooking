import styles from './Buttons.module.scss'
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material"; // <- note: import type from @mui/material

type CustomButtonProps = ButtonProps & {
  label?: string;
  value?: string;
  name?: string;
  className?: string;
};

function Buttons({ label, ...buttonProps }: CustomButtonProps) {
  return (
    <div>
        <Button {...buttonProps} className={ buttonProps.className ? `${styles.button} ${buttonProps.className}` : styles.button}>
          {label}
        </Button>
    </div>
  )
}

export default Buttons