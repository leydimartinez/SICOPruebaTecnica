export class Estudiante {
  public constructor(init?: Partial<Estudiante>) {
    Object.assign(this, init);
  }

  public id: number;
  public tipoIdentificacion: string;
  public identificacion: string;
  public nombre1: string;
  public nombre2: string;
  public apellido1: string;
  public apellido2: string;
  public email: string;
  public celular: string;
  public direccion: string;
  public ciudad: string;
}


export class filterStudent {
  public identificacion: string;
  public nombre1: string;
  public apellido1: string;
  public email: string;
}