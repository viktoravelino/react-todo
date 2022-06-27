import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProp) {
  return <input className={styles.input} {...rest} />;
}
