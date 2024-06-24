import { signOut } from 'firebase/auth';
import { auth } from 'shared/firebase/firebase';

const Logout = () => {
  const logOut = () => signOut(auth);
  return { logOut };
};

export default Logout;
