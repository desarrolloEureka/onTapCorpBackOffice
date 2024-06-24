'use client';
import { Suspense } from 'react';
import ResetPassword from './ResetPassword';

const page = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default page;
