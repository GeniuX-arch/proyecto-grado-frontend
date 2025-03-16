import axios from "axios";
import { host } from "./server";
import { Profesor } from "../interfaces/interfaces";

const profesor = 'profesores'; // Variable definida fuera de las funciones

export const listarProfesores = async (page:number): Promise<any[]> => {
    try {
        console.log(page)
        const response= await axios.get(`${host}/${profesor}?page=${page}&name=true`);
        return response.data;
    } catch (error) {
        console.error('Error al listar los profesores: ', error);
        throw new Error("No se pudo listar los profesores");
    }
}

export const obtenerProfesor = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${host}/${profesor}/${id}`);
        if (!response.data) {
            throw new Error("No se encontró al profesor");
        }
        return response.data;
    } catch (error) {
        console.error('Error al buscar al profesor: ', error);
        throw new Error("No se pudo encontrar al profesor");
    }
}

export const crearProfesor = async (data: Profesor | FormData): Promise<Profesor> => {
  try {
    const response = await axios.post(`${host}/${profesor}`, data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarProfesor = async (id: number, profesorActualizado: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${host}/${profesor}/${id}?_method=PUT`, profesorActualizado, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
