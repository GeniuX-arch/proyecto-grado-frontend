import axios from "axios"

export const getClases = async () => {
    try {
        const response = await axios.get(''); // Coloca la URL correcta aquí
        return response.data;
    } catch (error) {
        console.error("Error en la petición", error);
        throw error; // O puedes manejar el error de otra manera según tu aplicación
    }
};