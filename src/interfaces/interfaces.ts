// Interface para el modelo Profesor
export interface Profesor {
  id:number;
  tipo_cedula:string;
  cedula: string;
  nombre: string;
  tipo_contrato: string;
  estado:string;
  image_path:string;
}

export interface HorarioDisponible {
  id?: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  profesor_id: string;
}
// Interface para el modelo ProfesorMateria
export interface ProfesorMateria {
  id: number;                // Identificador único de la relación
  profesor_id: number;      // ID del profesor
  materia_id: number;       // ID de la materia
  experiencia: string;      // Descripción de la experiencia del profesor
  calificacion_alumno: number; // Calificación promedio de los alumnos
}

// Interface para el modelo Materia
export interface Materia {
  id: number;
  codigo: string; // Agregar este campo
  nombre: string; // Este ya estaba
  alumnos: number; // Este ya estaba
  calificacion_alumno?: number; // Opcional, según tu lógica
  experiencia?: number; // Opcional, según tu lógica

}


// Interface para el modelo Clase
export interface Clase {
  id?: number;
  grupo: string;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  alumnos: number;
  materia_id: number;
  profesor_id: number;
  salon_id: number;
}

// Interface para el modelo Salon
export interface Salon {
  id: number;
  codigo:string;
  capacidad_alumnos: number;
  tipo: string;
}


export interface SalonForm {
  id: string;
  capacidad_alumnos: string;
  tipo: string;
}