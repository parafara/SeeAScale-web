import { useCallback } from "react";
import api from "@api/axios";

export default function useUser() {
    const logIn = useCallback(async (email, password) => {
        const payload = { email, password };
        try {
            const response = await api.post('/account/login', payload);
            return { success: true, data: response.data };
        } catch (error) {
            const status = error.response?.status;
            const detail = error.response?.data?.detail;
            
            if (status === 422) {
                return { success: false, errorCode: 'INVALID_INPUT' };
            } else if (status === 401) {
                return { success: false, errorCode: detail };
            }
            
            return { success: false, errorCode: 'UNKNOWN_ERROR' };
        }
    }, []);

    return { logIn };
}