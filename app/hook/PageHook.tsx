'use client';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/firebase/auth';
import { LocalVariable } from '@/types/global';

const PageHook = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useLayoutEffect(() => {
    let theme = localStorage.getItem('@theme');
    if (theme) {
      // console.log('aaaaaa');

      const themeParsed = JSON.parse(theme) as LocalVariable;
      document.documentElement.setAttribute(
        'data-theme-mode',
        themeParsed.dataThemeMode
      );
    } else {
      const currentTheme = {
        dataThemeMode: 'light',
      } as LocalVariable;
      localStorage.setItem('@theme', JSON.stringify(currentTheme));
    }

    user && !isLoading
      ? router.replace('/components/home')
      : router.replace('/components/signIn');
  }, [isLoading, router, user]);

  return { user };
};

export default PageHook;
