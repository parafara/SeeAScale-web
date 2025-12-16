import { useState, useCallback } from "react";
import api from "@api/axios";

export default function useUser() {
    const [name, setName] = useState();

    const logIn = useCallback(async (email, password) => {
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

    const myName = useCallback(async () => {
        try {
            const response = await api.get('/account/my-name');
            setName(response.data.name);
            return;
        }
        catch (e) {
            return e;
        }
    }, []);

    return { name, logIn, myName };
}
