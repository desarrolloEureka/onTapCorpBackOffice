'use client';
import PageHook from './hook/PageHook';
import Spinner from './components/spinner/Spinner';

const page = () => {
  PageHook();

  return <Spinner grow />;
};

export default page;
