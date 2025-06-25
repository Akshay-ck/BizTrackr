import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const useFirestoreCollection = (db, collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
      } catch (err) {
        console.error('Firestore fetch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [db, collectionName]);

  return { data, loading, error };
};

export default useFirestoreCollection;
