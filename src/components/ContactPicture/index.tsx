import React from 'react';
import styles from './ContactPicture.module.scss';
import getRandomColor from '../../utils/getRandomColor';

const ContactPicture: React.FunctionComponent<any> = ({content}) => {
  return (
    <div style={{backgroundColor: getRandomColor()}} className={styles.wrapper}>
      {content}
    </div>
  );
};

export default ContactPicture;
