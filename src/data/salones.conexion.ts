import axios from "axios";
import { host } from "./server";
import { Salon } from "../interfaces/interfaces";

const salon = 'salon'; // Variable definida fuera de las funciones

export const listarSalones = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${host}/${salon}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar los salones: ', error);
        throw new Error("No se pudo listar los salones");
    }
}

export const obtenerSalon = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${host}/${salon}/${id}`);
        if (!response.data) {
            throw new Error("No se encontró el salón");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar el salón: ', error);
        throw new Error("No se pudo encontrar el salón");
    }
}

export const crearSalon = async (nuevoSalon: Salon): Promise<any> => {
    try {
        const response = await axios.post(`${host}/${salon}`, nuevoSalon);
        return response.data;
    } catch (error) {
        console.error('Error al crear el salón: ', error);
        throw new Error("No se pudo crear el salón");
    }
}

export const actualizarSalon = async (id: number, salonActualizado: Salon): Promise<any> => {
    try {
        const response = await axios.put(`${host}/${salon}/${id}`, salonActualizado);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el salón: ', error);
        throw new Error('No se pudo actualizar el salón');
    }
}

export const eliminarSalon = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${host}/${salon}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el salón: ', error);
        throw new Error('No se pudo eliminar el salón');
    }
}
