'use client';
import AuthValidate from '@/hook/AuthValidate';
import { LocalVariable } from '@/types/global';
import { useLayoutEffect } from 'react';

const HomeHook = () => {
  const { isLoading } = AuthValidate();

  useLayoutEffect(() => {
    const theme = localStorage.getItem('@theme');
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
  }, []);

  return { isLoading };
};

export default HomeHook;
