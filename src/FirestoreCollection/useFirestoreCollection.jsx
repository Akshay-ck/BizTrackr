import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const useFirestoreCollection = (db, collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollection = useCallback(async () => {
    setLoading(true);
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
  }, [db, collectionName]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { data, loading, error, refresh: fetchCollection };
};

export default useFirestoreCollection;
