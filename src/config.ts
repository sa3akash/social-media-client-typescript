
const baseUrl = import.meta.env.VITE_API_URL;

export const config = {
    apiUrl: baseUrl ? `${baseUrl}/api/v1` : '/api/v1'
};

