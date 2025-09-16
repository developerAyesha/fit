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
        // The service now extracts the data array, so we should get a direct array
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.warn('Unexpected data format:', data);
          setPlans([]);
        }
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
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

