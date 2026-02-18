// src/components/atoms/DateField/DateField.tsx
import React from "react";
import styles from "./DateFields.module.scss";

interface DateFieldProps {
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

const DateFields: React.FC<DateFieldProps> = ({ name, label, value, onChange, min, max }) => {
  return (
    <div className={styles.dateWrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={styles.dateInput}
      />
    </div>
  );
};

export default DateFields;
