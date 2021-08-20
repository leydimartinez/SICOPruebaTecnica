import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from 'src/app/students/api/students.service';
import { Curso } from 'src/app/students/models/curso.model';
import { EstudianteCurso } from 'src/app/students/models/estudiante-curso.model';
import { Estudiante } from 'src/app/students/models/estudiante.model';
import { FormType } from 'src/app/students/models/FormType.enum';
import Swal from 'sweetalert2';
import { StudentsComponent } from '../../students/students.component';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit {
  loading: boolean = false;
  studentForm = new FormGroup({
    id: new FormControl(0),
    tipoIdentificacion: new FormControl(''),
    identificacion: new FormControl(''),
    nombre1: new FormControl(''),
    nombre2: new FormControl(''),
    apellido1: new FormControl(''),
    apellido2: new FormControl(''),
    email: new FormControl(''),
    celular: new FormControl(''),
    direccion: new FormControl(''),
    ciudad: new FormControl('')
  });
  /*  studentForm = this.formBuilder.group({
     id:[0],
     tipoIdentificacion: ['', [Validators.required]],
     identificacion: ['', [Validators.required]],
     nombre1: ['', [Validators.required]],
     nombre2: [''],
     apellido1: ['', [Validators.required]],
     apellido2: [''],
     email: ['', [Validators.email]],
     celular: [''],
     direccion: [''],
     ciudad: ['', [Validators.required]],
   }); */
  public selected: number[];
  submitted = false;


  constructor(public services: StudentsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManageStudentsComponent>) {
    this.services.listStudentData = new Array<Estudiante>();
    this.services.coursesData = new Curso();
    this.services.listCoursesAvailable = new Array<Curso>();
    this.services.listStudentCourse = new Array<EstudianteCurso>();

    if (this.services.tipoForm == FormType.edit) {
      this.initForm(this.services.studentData);
      this.getCourseStudent();
      this.getStudentAvailableCourses();
    }
  }

  ngOnInit() {
  }

  /**fácil acceso a los campos del formulario */
  get registerFormControl() {
    return this.studentForm.controls;
  }

  /** método que se invoca desde el submit del
   *  form puede ser editar o guardar */
  saveEditStudentsData() {

    this.submitted = true;
    if (this.studentForm.valid) {

      var studentsForm = new Estudiante(this.studentForm.value);
      if (this.services.tipoForm == FormType.save) {
        this.saveStudentsData(studentsForm);
      } else {
        this.editStudentsData(studentsForm);
      }
    }

  }

  /** Método que se invoca desde saveEditStudentsData 
   * para guardar datos del estudiante */
  saveStudentsData(studentsForm: Estudiante) {
    this.loading = true;
    this.services.saveStudentData(studentsForm).subscribe(
      response => {
        this.loading = false;
        Swal.fire('Exito!!', 'Guardado correctamente', 'success')
        debugger
        /**Se agrega nuevamente con el id del estudiante */
        this.services.studentData = response;
        this.initForm(this.services.studentData);
        /**Se cambia el formulario a edit y se buscan los datos del curso disponible para ese estudiante  */
        this.services.tipoForm = FormType.edit;
        this.getCourseStudent();
        this.getStudentAvailableCourses();
      },
      error => {

        this.loading = false;
        Swal.fire('Error!!', error.error, 'error')
      })
  }

  /** Método que se invoca desde saveEditStudentsData 
  * para editar datos del estudiante */
  editStudentsData(studentsForm: Estudiante) {
    debugger
    this.loading = true;
    this.services.editStudentData(studentsForm).subscribe(
      response => {
        this.loading = false;
        Swal.fire('Exito!!', 'Editado correctamente', 'success')
        this.services.studentData = response;
        this.services.tipoForm = 2;
      },
      error => {
        this.loading = false;
        Swal.fire('Error!!', error.error, 'error')
      })
  }

  /** Se obtiene lo cursos disponibles para ese estudiante */
  getStudentAvailableCourses() {

    if (this.services.studentData.id != undefined || this.services.studentData.id != 0) {
      this.services.getStudentAvailableCourses(this.services.studentData.id).subscribe(
        response => {

          this.services.listCoursesAvailable = response;
        },
        error => {

          Swal.fire('Error!!', 'Ha ocurrido un error al consultar los cursos', 'error')
        })
    }
  }

  /** Se agrega cursos a un estudiante */
  addCourseStudent() {

    var listStudentCourse = new Array<EstudianteCurso>();
    if (this.selected != undefined) {
      this.selected.forEach(idCourse => {

        var studentCourse = new EstudianteCurso();
        studentCourse.idEstudiante = this.services.studentData.id;
        studentCourse.idCurso = idCourse;
        listStudentCourse.push(studentCourse);
      });

      this.services.saveStudentCourse(listStudentCourse).subscribe(
        response => {

          Swal.fire('Exito!!', 'Agregado Correctamente', 'success')
          this.getCourseStudent();
          this.getStudentAvailableCourses();
        },
        error => {

          Swal.fire('Error!!', 'Ha ocurrido un error al guardar el curso al estudiante', 'error')
        })
    } else {
      Swal.fire('Advertencia', 'Debe seleccionar por lo menos un curso', 'warning');
    }
  }

  /** Obtiene los cursos asociados a un estudiante */
  getCourseStudent() {
    this.services.getStudentCourse(this.services.studentData.id).subscribe(
      response => {

        this.services.listStudentCourse = response;
      },
      error => {

        Swal.fire('Error!!', 'Ha ocurrido un error al consultar los cursos', 'error')
      })
  }

  /**Eliminar Cursos */
  deleteCourseStudent(row: EstudianteCurso) {
    this.services.deleteStudentCourse(row.id).subscribe(
      response => {

        this.services.listCoursesAvailable = response;
        this.getCourseStudent();
      },
      error => {

        Swal.fire('Error!!', 'Ha ocurrido un error al consultar los cursos', 'error')
      })
  }

  closeModal() {
    this.dialogRef.close();
  }

  /**Inicializar el formulario para el editar con los campos de los estudiantes */
  private initForm = (_data: Estudiante): void => {
    debugger
    this.studentForm = this.formBuilder.group({
      id: [_data.id],
      tipoIdentificacion: [_data.tipoIdentificacion, [Validators.required]],
      identificacion: [_data.identificacion, [Validators.required]],
      nombre1: [_data.nombre1, [Validators.required]],
      nombre2: [_data.nombre2],
      apellido1: [_data.apellido1, [Validators.required]],
      apellido2: [_data.apellido2],
      email: [_data.email],
      celular: [_data.celular],
      direccion: [_data.direccion],
      ciudad: [_data.ciudad, [Validators.required]],
    });
  }

}


