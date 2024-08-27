/* eslint-disable no-unused-vars */
import React from 'react';

export function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <a href='#' onClick={(e) => e.preventDefault()} style={{ marginRight: '4px' }}>Précédent</a>;
  }
  if (type === "next") {
    return <a href='#' onClick={(e) => e.preventDefault()} style={{ marginLeft: '4px', marginRight: '20px' }}>Suivant</a>;
  }
  return originalElement;
}

export function onShowSizeChange(current, pageSize) {
  // console.log(current, pageSize);
}