import React from 'react'
import styles from './InputFields.module.scss'

type InputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const InputFields: React.FC<InputProps> = ({
  type, name, label, placeholder, value, onChange, className
}) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className}`}
    />
  </div>
);

export default InputFields;