import { Curso } from "./curso.model";
import { Estudiante } from "./estudiante.model";

export class EstudianteCurso {
  constructor() { }

  public id: number;
  public idEstudiante: number;
  public idCurso: number;
  public notaFinal: number;
  public estudiante: Estudiante;
  public curso: Curso;
}


