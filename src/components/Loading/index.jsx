import { Icon } from '@iconify/react';
import React from 'react'
import './styles/Loading.css';
import './styles/Loading-mobile.css';

function Loading() {
  return (
    <section className="loading">
      <Icon icon="line-md:loading-loop" />
    </section>
  );
}

export default Loading;