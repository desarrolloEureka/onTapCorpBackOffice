import { useEffect } from 'react';
import useAuth from '@/firebase/auth';
import { useRouter } from 'next/navigation';

const AuthValidate = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    !isLoading && !user && router.replace('/components/signIn');
  }, [isLoading, router, user]);

  return { isLoading, user };
};

export default AuthValidate;
