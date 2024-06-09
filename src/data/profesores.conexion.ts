import axios from "axios";
import { host } from "./server";
import { Profesor } from "../interfaces/interfaces";

const profesor = 'profesores'; // Variable definida fuera de las funciones

export const listarProfesores = async (): Promise<any[]> => {
    try {
        const response= await axios.get(`${host}/${profesor}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar los profesores: ', error);
        throw new Error("No se pudo listar los profesores");
    }
}

export const obtenerProfesor = async (cedula: number): Promise<any> => {
    try {
        const response = await axios.get(`${host}/${profesor}/${cedula}`);
        if (!response.data) {
            throw new Error("No se encontró al profesor");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar al profesor: ', error);
        throw new Error("No se pudo encontrar al profesor");
    }
}

export const crearProfesor = async (nuevoProfesor: Profesor): Promise<any> => {
    try {
        const response = await axios.post(`${host}/${profesor}`, nuevoProfesor);
        return response.data;
    } catch (error) {
        console.error('Error al crear al profesor: ', error);
        throw new Error("No se pudo crear al profesor");
    }
}

export const actualizarProfesor = async (cedula: number, profesorActualizado: Profesor): Promise<any> => {
    try {
        const response = await axios.put(`${host}/${profesor}/${cedula}`, profesorActualizado);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar al profesor: ', error);
        throw new Error('No se pudo actualizar al profesor');
    }
}

export const eliminarProfesor = async (cedula: number): Promise<any> => {
    try {
        const response= await axios.delete(`${host}/${profesor}/${cedula}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar al profesor: ', error);
        throw new Error('No se pudo eliminar al profesor');
    }
}
