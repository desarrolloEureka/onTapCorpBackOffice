import { DemoChangerElement } from '@/types/user';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginData } from '@/data/user';
import { confirmPasswordResetFirebase, loginFirebase } from '@/firebase/user';
import useAuth from '@/firebase/auth';

const ResetPasswordHook = () => {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get('oobCode');
  const [data, setData] = useState(LoginData);
  const { email, password, newPassword } = data;
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidOobCode, setInvalidOobCode] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [sigIn, setSignIn] = useState(false);

  const SwitcherButton = () => {
    let demoChanger: DemoChangerElement | null =
      document.querySelector('.demo_changer');
    if (demoChanger) {
      demoChanger.style.right = '0px';
    }
    document.querySelector('.demo_changer')?.classList?.toggle('active');
  };

  const remove = () => {
    let demoChanger: DemoChangerElement | null =
      document.querySelector('.demo_changer');

    if (demoChanger) {
      demoChanger.style.right = '-270px';
    }
    document.querySelector('.demo_changer')?.classList?.remove('active');
  };

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    if (email != '' && oobCode) {
      if (password != '' && newPassword != '' && password === newPassword) {
        confirmPasswordResetFirebase(oobCode, password)
          .then(async (result) => {
            setInvalidOobCode(false);
            setInvalidPassword(false);
            setInvalidEmail(false);
            loginFirebase(email, password).then(() => setSignIn(true));
            // router.replace('/components/signIn');
          })
          .catch((error) => {
            setError('El código es invalido o ya esta vencido');
            setInvalidOobCode(true);
          });
      } else {
        setError('Las contraseñas no coinciden');
        setInvalidPassword(true);
      }
      setInvalidEmail(false);
    } else {
      setError('El correo es obligatorio');
      setInvalidPassword(false);
      setInvalidEmail(true);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/components/home');
    }
  }, [router, user]);

  return {
    SwitcherButton,
    remove,
    changeHandler,
    handleResetPassword,
    email,
    password,
    newPassword,
    invalidEmail,
    invalidPassword,
    invalidOobCode,
    error,
    setShowPassword,
    showPassword,
    showNewPassword,
    setShowNewPassword,
    sigIn,
  };
};

export default ResetPasswordHook;
