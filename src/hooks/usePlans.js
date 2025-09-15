import { useState, useEffect } from 'react';
import { planService } from '@/services/planService';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await planService.getPlans();
      
      if (error) {
        setError(error.message);
        setPlans([]);
      } else {
        setPlans(data.data || []);
      }
    } catch (err) {
      setError('Failed to fetch plans');
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refetch: fetchPlans
  };
};
