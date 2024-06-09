import { host } from "./server";
import axios from "axios";
import { Materia } from "../interfaces/interfaces";

// Listar todas las materias
const materia = 'materia'; // Variable definida fuera de las funciones

export const listarMaterias = async () => {
    try {
        const response = await axios.get(`${host}/${materia}`);
        return response.data;
    } catch (error) {
        console.error('Error al listar las materias: ', error);
        throw new Error("No se pudo listar las materias");
    }
}

export const obtenerMateria = async (id:string) => {
    try {
        const response = await axios.get(`${host}/${materia}/${id}`);
        if (!response.data) {
            throw new Error("No se encontró la materia");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar la materia: ', error);
        throw new Error("No se pudo encontrar la materia");
    }
}

export const crearMateria = async (nuevaMateria:Materia) => {
    try {
        const response = await axios.post(`${host}/${materia}`, nuevaMateria);
        return response.data;
    } catch (error) {
        console.error('Error al crear la materia: ', error);
        throw new Error("No se pudo crear la materia");
    }
}

export const actualizarMateria = async (id:string, materiaActualizada:Materia) => {
    try {
        const response = await axios.put(`${host}/${materia}/${id}`, materiaActualizada);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la materia: ', error);
        throw new Error('No se pudo actualizar la materia');
    }
}

export const eliminarMateria = async (id:string) => {
    try {
        const response = await axios.delete(`${host}/${materia}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la materia: ', error);
        throw new Error('No se pudo eliminar la materia');
    }
}
