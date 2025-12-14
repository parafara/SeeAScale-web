import { useEffect, useState } from "react";
import api from "@api/axios";

export default function useUserName() {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        const fetchName = async () => {
            try {
                const response = await api.get("/account/my-name");
                if (isMounted) {
                    setName(response.data.name);
                }
            } catch (error) {
                if (isMounted) {
                    setName(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchName();

        return () => {
            isMounted = false;
        };
    }, []);

    return { name, loading };
}