// Interface para el modelo Profesor
export interface Profesores {
  cedula: any;
  nombre: string;
  tipo_contrato: string;
  estado:string;
}

// Interface para el modelo ProfesorMateria
export interface ProfesorMateria {
  id: number;
  
  profesor: Profesores;
  materia: Materia;
}

// Interface para el modelo Materia
export interface Materia {
  id: number;
  nombre: string;
  profesores: ProfesorMateria[];
  tiempos: Clase[];
}

// Interface para el modelo Clase
export interface Clase {
  id: number;
  grupo: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  materia: Materia;
  salon: Salon;
}

// Interface para el modelo Salon
export interface Salon {
  id: number;
  capacidadAlumnos: number;
  tipo: string;
  tiempos: Clase[];
}
