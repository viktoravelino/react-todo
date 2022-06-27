import { ButtonHTMLAttributes } from 'react';
import styles from './CreateButton.module.css';

import { PlusCircle } from 'phosphor-react';

interface CreateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function CreateButton({ text, ...rest }: CreateButtonProps) {
  return (
    <button className={styles.createButton} {...rest}>
      {text || 'Button'} <PlusCircle size={20} />
    </button>
  );
}
