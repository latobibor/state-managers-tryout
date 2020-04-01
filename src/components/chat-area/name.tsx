import React from 'react';
import styles from './name.module.less';

interface NameProps {
  name: string;
}

export function Name({ name }: NameProps) {
  return <div className={styles.name}>{name}</div>;
}
