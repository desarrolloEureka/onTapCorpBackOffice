import { useEffect, useState } from 'react';
import { getProfileDataByIdFb, SendViewUser } from '@/firebase/user';

const CardViewHookWithUser = ({ uid }: { uid: string | null }) => {
  const [viewsIncremented, setViewsIncremented] = useState(false);
  const [user, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getProfileDataByIdFb(uid);
      setUserData(data);
    };
    fetchUserData();
  }, [uid]);

  useEffect(() => {
    if (user) {
      if (!viewsIncremented && user?.switch_activateCard && user?.views != null && Number.isInteger(user?.views)) {
        const userId = user?.uid;
        const viewsNow = user?.views;
        const viewsNew = viewsNow + 1;

        SendViewUser(userId, viewsNew)
          .then(() => {
            setViewsIncremented(true); // Marcar como incrementado
          })
          .catch((error) => {
            console.error('Error sending view:', error);
          });
      }
    }
  }, [user, viewsIncremented]);

  return  {user}
};

export default CardViewHookWithUser;
