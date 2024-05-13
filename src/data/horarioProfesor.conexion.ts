import axios from "axios";
import { host } from "./server";


export const listarHorariosDisponibles = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${host}/horario-disponible`);
        return response.data;
    } catch (error) {
        console.error('Error al listar los horarios disponibles: ', error);
        throw new Error("No se pudo listar los horarios disponibles");
    }
}

export const obtenerHorarioDisponible = async (id: number): Promise<any> => {
    try {
        const response= await axios.get(`${host}/horario-disponible/${id}`);
        if (!response.data) {
            throw new Error("No se encontró el horario disponible");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar el horario disponible: ', error);
        throw new Error("No se pudo encontrar el horario disponible");
    }
}

export const crearHorarioDisponible = async (nuevoHorario: any): Promise<any> => {
    try {
        const response = await axios.post(`${host}/horario-disponible`, nuevoHorario);
        return response.data;
    } catch (error) {
        console.error('Error al crear el horario disponible: ', error);
        throw new Error("No se pudo crear el horario disponible");
    }
}

export const actualizarHorarioDisponible = async (id: number, horarioActualizado: any): Promise<any> => {
    try {
        const response = await axios.put(`${host}/horario-disponible/${id}`, horarioActualizado);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el horario disponible: ', error);
        throw new Error('No se pudo actualizar el horario disponible');
    }
}

export const eliminarHorarioDisponible = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${host}/horario-disponible/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el horario disponible: ', error);
        throw new Error('No se pudo eliminar el horario disponible');
    }
}