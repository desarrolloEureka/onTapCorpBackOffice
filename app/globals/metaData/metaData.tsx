'use client';
export const getMeta = () => {
  const currentData = localStorage.getItem('@metaData');
  console.log('currentData>>>>>', currentData);

  return currentData;
};
