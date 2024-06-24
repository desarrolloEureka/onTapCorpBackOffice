import React from 'react';
import Head from 'next/head';
import favicon from '../../../public/assets/images/brand-logos/favicon.ico';
import { keyWords } from '@/data/keywords';

const Seo = ({ title }: { title: string }) => {
  let i = `Ten - ${title}`;
  return (
    <Head>
      <title>{i}</title>
      <link rel='icon' href={favicon.src} />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <meta name='description' content='Ten - Admin &amp; Dashboard' />
      <meta name='author' content='Teranov S.A.S' />
      <meta name='keywords' content={keyWords}></meta>
    </Head>
  );
};

export default Seo;
