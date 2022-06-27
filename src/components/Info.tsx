import styles from './Info.module.css';

interface InfoProps {
  text: string;
  number: string;
  color: 'blue' | 'purple';
}

export function Info({ text, number, color, ...rest }: InfoProps) {
  return (
    <div className={styles.infoContainer}>
      <span className={color === 'blue' ? styles.blue : styles.purple}>
        {text}
      </span>
      <div>{number}</div>
    </div>
  );
}
