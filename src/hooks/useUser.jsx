import { useState, useCallback } from "react";
import api from "@api/axios";

export default function useUser() {
    const [name, setName] = useState(null);

    const fetchLogIn = useCallback(async (email, password) => {
        const payload = { email, password };
        try {
            const response = await api.post('/account/login', payload);
            setName(response.data.name);
            return {name: response.data.name};
        }
        catch (e) {
            return e;
        }
    }, []);

    const fetchLogOut = useCallback(async () => {
        await api.post('/account/logout');
        setName(null);
    }, []);

    const fetchMyName = useCallback(async () => {
        try {
            const response = await api.get('/account/my-name');
            setName(response.data.name);
            return;
        }
        catch (e) {
            return e;
        }
    }, []);

    return [name, fetchLogIn, fetchLogOut, fetchMyName];
}
