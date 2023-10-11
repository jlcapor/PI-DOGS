import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
	)
};

Loader.propTypes = {};

export default Loader;