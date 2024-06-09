import axios from "axios";
import { host } from "./server";
import { Clase } from "../interfaces/interfaces";

// Funciones para Clases
const clase = "clases"; // Variable clase definida fuera de las funciones

export const listarClases = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${host}/${clase}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar las clases: ', error);
        throw new Error("No se pudo listar las clases");
    }
}

export const obtenerClase = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${host}/${clase}/${id}`);
        if (!response.data) {
            throw new Error("No se encontró la clase");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar la clase: ', error);
        throw new Error("No se pudo encontrar la clase");
    }
}

export const crearClase = async (nuevaClase: Clase): Promise<any> => {
    try {
        const response = await axios.post(`${host}/${clase}`, nuevaClase); // Modificado aquí
        return response.data;
    } catch (error) {
        console.error('Error al crear la clase: ', error);
        throw new Error("No se pudo crear la clase");
    }
}

export const actualizarClase = async (id: number, claseActualizada: Clase): Promise<any> => {
    try {
        const response = await axios.put(`${host}/${clase}/${id}`, claseActualizada); // Modificado aquí
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la clase: ', error);
        throw new Error('No se pudo actualizar la clase');
    }
}

export const eliminarClase = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${host}/${clase}/${id}`); // Modificado aquí
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la clase: ', error);
        throw new Error('No se pudo eliminar la clase');
    }
}
