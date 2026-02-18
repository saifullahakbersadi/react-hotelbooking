// src/components/atoms/DateRangeField/DateRangeField.tsx
import React from "react";
import styles from "./DateRangeField.module.scss";

interface DateRangeFieldProps {
  from: string;
  to: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

const DateRangeField: React.FC<DateRangeFieldProps> = ({ from, to, onChange, min, max }) => {
  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.field}>
        <label htmlFor="fromDate">From</label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          value={from}
          onChange={onChange}
          min={min}
          max={max}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="toDate">To</label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          value={to}
          onChange={onChange}
          min={from || min}
          max={max}
        />
      </div>
    </div>
  );
};

export default DateRangeField;
