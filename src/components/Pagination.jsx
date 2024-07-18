/* eslint-disable no-unused-vars */
import React  from 'react';
import { Link } from 'next/link';

export function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <Link>Previous</Link>;
    }
    if (type === "next") {
      return <Link>Next</Link>;
    }
    return originalElement;
  }
  
  export function onShowSizeChange(current, pageSize) {
    // console.log(current, pageSize);
  }