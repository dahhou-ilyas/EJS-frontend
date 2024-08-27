"use client";

import { useEffect } from 'react';

const Alertify_Wrapper = () => {
  useEffect(() => {
    const loadAlertify = async () => {
      try {
        const alertify = await import('alertifyjs');
        alertify.set('notifier', 'position', 'top-right');
      } catch (error) {
        console.error('Error loading alertifyjs:', error);
      }
    };

    loadAlertify();
  }, []);

  return null;
};

export default Alertify_Wrapper;
