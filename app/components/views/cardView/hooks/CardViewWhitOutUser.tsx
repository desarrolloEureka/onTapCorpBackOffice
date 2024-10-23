import { useEffect, useState } from 'react';
import { GetUser } from '@/firebase/user';

const CardViewWhitOutUser = (typePlatform: string | null) => {
  const [type, setType] = useState<string | undefined>();
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUser(true);
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (typePlatform) {
      const type = typePlatform;
      setType(type);
    }
  }, [typePlatform]);

  return { user };
};

export default CardViewWhitOutUser;