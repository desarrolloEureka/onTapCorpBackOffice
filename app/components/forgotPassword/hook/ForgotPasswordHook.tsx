import { DemoChangerElement } from '@/types/user';
import { useState } from 'react';
import { LoginData } from '@/data/user';
import { resetPasswordFirebase } from '@/firebase/user';

const ForgotPasswordHook = () => {
  const [data, setData] = useState(LoginData);
  const [message, setMessage] = useState('');
  const { email } = data;

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

  const handleRemember = async () => {
    resetPasswordFirebase(email)
      .then((result) => {
        setMessage(
          'Hemos enviado un correo de recuperación  a tu cuenta de correo.'
        );
      })
      .catch((error) => {
        setMessage(
          'No pudimos encontrar tu cuenta de correo, por favor verifica tus datos e intenta de nuevo.'
        );
      });
  };

  return {
    SwitcherButton,
    remove,
    handleRemember,
    changeHandler,
    email,
    message,
  };
};

export default ForgotPasswordHook;
