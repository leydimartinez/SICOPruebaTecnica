import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { StudentsService } from '../../api/students.service';
import { Estudiante, filterStudent } from '../../models/estudiante.model';
import { FormType } from '../../models/FormType.enum';
import { ManageStudentsComponent } from '../modal/manage-students/manage-students.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  columnas: string[] = ['Numero', 'TipoIdentificacion', 'Identificacion', 'Nombre1', 'Nombre2', 'Apellido1', 'Apellido2', 'Email', 'Celular', 'Direccion', 'Ciudad', 'Editar'];
  datosEstudiante: MatTableDataSource<Estudiante>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  filterData: filterStudent;
  public listStudentTemporalData: Array<Estudiante>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(public matDialog: MatDialog, public services: StudentsService) {
    this.filterData = new filterStudent();
  }

  ngOnInit() {
    this.getStudentDataState();
  }


  /**Abrir modal para adiccionar o editar el estudiante */
  openFormAddStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "manage-student-modal";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    this.services.tipoForm = FormType.save;
    const modalDialog = this.matDialog.open(ManageStudentsComponent, dialogConfig);
    this.afterClosedModal(modalDialog);
  }

  openFormEditStudent(row: Estudiante) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "manage-student-modal";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";
    this.services.studentData = row;
    this.services.tipoForm = FormType.edit;
    const modalDialog = this.matDialog.open(ManageStudentsComponent, dialogConfig);
    this.afterClosedModal(modalDialog);
  }


  afterClosedModal(modalDialog) {
    modalDialog.afterClosed().subscribe(name => {
      this.getStudentDataState();
    })
  }

  filterDataSudent() {
    if ((this.filterData.identificacion == "" || this.filterData.identificacion == undefined) &&
      (this.filterData.nombre1 == "" || this.filterData.nombre1 == undefined) &&
      (this.filterData.apellido1 == "" || this.filterData.apellido1 == undefined) &&
      (this.filterData.email == "" || this.filterData.email == undefined)) {

      this.datosEstudiante = new MatTableDataSource(this.services.listStudentData);
      this.datosEstudiante.paginator = this.paginator;
      this.datosEstudiante.sort = this.sort;
    } else {

      var identificacion = (this.filterData.identificacion == undefined || this.filterData.identificacion == "") ? "" : this.filterData.identificacion;
      var nombre1 = (this.filterData.nombre1 == undefined || this.filterData.nombre1 == "") ? "" : this.filterData.nombre1.toLowerCase();
      var apellido1 = (this.filterData.apellido1 == undefined || this.filterData.apellido1 == "") ? "" : this.filterData.apellido1.toLowerCase();
      var email = (this.filterData.email == undefined || this.filterData.email == "") ? "" : this.filterData.email.toLowerCase();

      this.listStudentTemporalData = this.services.listStudentData.filter(x =>
        ((identificacion == "") || x.identificacion.toLowerCase().includes(identificacion) )
        &&  ((nombre1 == "") || x.nombre1.toLowerCase().includes(nombre1) )
        &&  ((apellido1 == "") || x.apellido1.toLowerCase().includes(apellido1) )
        &&  ((email == "") || x.email.toLowerCase().includes(email) )
        ) ;

      this.datosEstudiante = new MatTableDataSource(this.listStudentTemporalData);
      this.datosEstudiante.paginator = this.paginator;
      this.datosEstudiante.sort = this.sort;
     
    }

  }

  


  filtrarEstudiantes(x): void {
    /*   indentificacion ? true : x.identificacion.indexOf(this.filterData.identificacion) !==-1
      &&
      nombre1 ? true : x.nombre1.indexOf(this.filterData.nombre1) !== -1
      &&
      apellido1 ? true : x.apellido1.indexOf( this.filterData.apellido1) !== -1
      &&
      email ? true : x.email.indexOf( this.filterData.email) !== -1 */
  }


  public getStudentDataState() {
    this.services.getStudentData().subscribe(
      response => {
        if (response != null) {
          this.services.listStudentData = response;
          this.datosEstudiante = new MatTableDataSource(this.services.listStudentData);
          this.datosEstudiante.paginator = this.paginator;
          this.datosEstudiante.sort = this.sort;

        }
      },
      error => {
        Swal.fire('Error!!', 'Ha ocurrido un error al obtener los datos de los estudiantes', 'error')
      })
  }

}
