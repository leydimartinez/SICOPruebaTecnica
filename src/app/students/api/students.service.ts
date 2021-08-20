import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';
import { EstudianteCurso } from '../models/estudiante-curso.model';
import { Estudiante } from '../models/estudiante.model';
import { FormType } from '../models/FormType.enum';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl = environment.url;
  public listStudentData: Array<Estudiante>;
  public studentData: Estudiante;
  public coursesData: Curso;
  public listCoursesAvailable: Array<Curso>;
  public tipoForm: FormType = FormType.save;
  public listStudentCourse: EstudianteCurso[];

  constructor(private http: HttpClient) {
 
  }


  public getStudentData() {
    return this.http.get<Array<Estudiante>>(this.apiUrl + '/api/Estudiantes/GetAllStudentData', { responseType: "json" })
  }

  public saveStudentData(student: Estudiante) {
    return this.http.post<Estudiante>(this.apiUrl + '/api/Estudiantes/SaveStudentData', student, { responseType: "json" })
  }

  public editStudentData(student: Estudiante) {
    return this.http.post<Estudiante>(this.apiUrl + '/api/Estudiantes/EditStudentData', student, { responseType: "json" })
  }

  public getStudentAvailableCourses(studentId: number) {
    return this.http.get<Array<Curso>>(this.apiUrl + '/api/Estudiantes/GetStudentAvailableCourses?StudentId=' + studentId, { responseType: "json" })
  }


  public saveStudentCourse(studentCourse: Array<EstudianteCurso>) {
    return this.http.post<Array<EstudianteCurso>>(this.apiUrl + '/api/Estudiantes/SaveStudentCourse', studentCourse, { responseType: "json" })
  }

  public getStudentCourse(studentId: number) {
    return this.http.get<Array<EstudianteCurso>>(this.apiUrl + '/api/Estudiantes/GetStudentCourses?StudentId=' + studentId, { responseType: "json" })
  }

  public deleteStudentCourse(studentCourseId: number) {
    return this.http.delete<Array<Curso>>(this.apiUrl + '/api/Estudiantes/DeleteStudentCourse?StudentCourseId=' + studentCourseId, { responseType: "json" })
  }
}


