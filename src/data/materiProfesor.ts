import axios from "axios";
import { host } from "./server";
import {  ProfesorMateria } from "../interfaces/interfaces";

// Funciones para ProfesorMateria
const profesorMateria = 'profesor-materia'; // Variable definida fuera de las funciones

export const listarProfesorMateria = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${host}/${profesorMateria}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar las relaciones ProfesorMateria: ', error);
        throw new Error("No se pudo listar las relaciones ProfesorMateria");
    }
}

export const obtenerProfesorMateria = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${host}/${profesorMateria}/${id}`);
        if (!response.data) {
            throw new Error("No se encontró la relación ProfesorMateria");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar la relación ProfesorMateria: ', error);
        throw new Error("No se pudo encontrar la relación ProfesorMateria");
    }
}

export const crearProfesorMateria = async (nuevaRelacion: ProfesorMateria): Promise<any> => {
    try {
        const response = await axios.post(`${host}/${profesorMateria}`, nuevaRelacion);
        return response.data;
    } catch (error) {
        console.error('Error al crear la relación ProfesorMateria: ', error);
        throw new Error("No se pudo crear la relación ProfesorMateria");
    }
}

export const actualizarProfesorMateria = async (id: number, relacionActualizada: ProfesorMateria): Promise<any> => {
    try {
        const response = await axios.put(`${host}/${profesorMateria}/${id}`, relacionActualizada);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la relación ProfesorMateria: ', error);
        throw new Error('No se pudo actualizar la relación ProfesorMateria');
    }
}

export const eliminarProfesorMateria = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${host}/${profesorMateria}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la relación ProfesorMateria: ', error);
        throw new Error('No se pudo eliminar la relación ProfesorMateria');
    }
}
