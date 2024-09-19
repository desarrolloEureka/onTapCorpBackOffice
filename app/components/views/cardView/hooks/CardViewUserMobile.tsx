import { useEffect, useState } from 'react';
import { getProfileDataByIdFb } from '@/firebase/user';

const CardViewUserMobile = ({ userUid, typePlatform }: { userUid: string | null , typePlatform: string}) => {
    const [user, setUserData] = useState<any>(null);
    const [type, setType] = useState<string | undefined>();

    useEffect(() => {
        const fetchUserData = async () => {
          const data = await getProfileDataByIdFb(userUid);
          setUserData(data);
        };
        fetchUserData();
      }, [userUid]);

    useEffect(() => {
        if (user) {
            setType(typePlatform);
        }
    }, [user, typePlatform]);
    return { user };
};

export default CardViewUserMobile;