import { useState, useEffect } from 'react';
import { planService } from '@/services/planService';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await planService.getCurrentSubscription();
      
      if (error) {
        setError(error.message);
        setSubscription(null);
      } else {
        setSubscription(data.data);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('Failed to fetch subscription');
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);


  return {
    subscription,
    loading,
    error,
    refetch: fetchSubscription
  };
};
