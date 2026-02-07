
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PaymentInitiateSchema } from '../schemas/paymentSchema';

// Config
const API_BASE = '/api/payment';

// Initiate Payment (POST)
export const useInitiatePayment = () => {
    return useMutation({
        mutationFn: async (data) => {
            // Optional: Client-side validation before request
            const validatedData = PaymentInitiateSchema.parse(data);
            const response = await axios.post(`${API_BASE}/initiate`, validatedData);
            return response.data;
        },
    });
};

// Initiate Payment View (GET)
export const useGetInitiatePayment = (queryParams, options = {}) => {
    return useQuery({
        queryKey: ['initiatePayment', queryParams],
        queryFn: async () => {
            // Validate query params if needed, or send as is
            const validatedParams = PaymentInitiateSchema.partial().parse(queryParams || {});
            const response = await axios.get(`${API_BASE}/initiate`, { params: validatedParams });
            return response.data;
        },
        enabled: !!queryParams && Object.keys(queryParams).length > 0, // Only run if params exist
        ...options
    });
};
