import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.template.html'
})
export class NavigationComponent implements OnInit {
    @Input() username: string;
    @Input() admin: boolean;
    @Input() instructor: boolean;

  items = [
    {icon: 'fas fa-chart-line', name: 'Dashboard', route: '#1'},
    {icon: 'fas fa-graduation-cap', name: 'Courses', route: 'courseslist'},
    {icon: 'fas fa-chalkboard-teacher', name: 'Classes', route: 'classeslist'},
    {icon: 'fas fa-briefcase', name: 'Company', route: 'company'},
    //{icon: 'fas fa-plus', name: 'Class Reservations', route: 'classReservations'},
    {icon: 'fas fa-phone-volume', name: 'Support', route: 'support'},
    {icon: 'fas fa-chart-line', name: 'Statistics', route: 'statistics'},
    {icon: 'fas fa-comment', name: 'Contact Users', route: 'contactUsers'},
    {icon: 'fas fa-mail-bulk', name: 'Email Template', route: 'emailTemplate'},
    {icon: 'far fa-calendar-alt', name: 'Calendar', route: '#2'},
    /*
    {icon: 'fa-briefcase', name: 'Mis cursos', route: 'tutoria'},
    {icon: 'fa-gear', name: 'Mantenimiento', route: 'config', subitems: [
      {icon: 'fa-tags',      name: 'Tipologias',  route: 'temas'},
      {icon: 'fa-globe',     name: 'Ubicaciones', route: 'ubicaciones'},
      {icon: 'fa-clock-o',   name: 'Horarios',    route: 'horarios'},
      {icon: 'fa-cubes',     name: 'Plantillas',  route: 'plantillas'},
      {icon: 'fa-calendar',  name: 'Calendarios', route: 'calendarios'},
    ]},
    {icon: 'fa-graduation-cap', name: 'Cursos', route: 'cursos', subitems: [
      {name: 'Lista',   route: 'lista'},
      {name: 'Nuevo',   route: 'nuevo'},
      {name: 'Editar',  route: 'editar'},
    ]},
    {icon: 'fa-users', name: 'Partners', route: 'partners', subitems: [
      {name: 'Lista', route: 'lista' },
      {name: 'Nuevo', route: 'nuevo' }
    ]},
    {icon: 'fa-flag', name: 'NIS', route: 'nis', subitems: [
      {name: 'Importar', route: 'importar'},
      {name: 'Lista',   route: 'lista'},
    ]},
    {icon: 'fa-user', name: 'Usuarios', route: 'usuarios', subitems: [
      {name: 'Lista',   route: 'lista'},
      {name: 'Nuevo',   route: 'nuevo'},
      {name: 'Editar',  route: 'editar'},
    ]},
    {icon: 'fa-area-chart', name: 'Reports', route: 'reports', subitems: [
      {name: 'Inscripciones',   route: 'inscripciones'},
    ]},
    */
  ];

  constructor(private _router: Router) {}
    
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();
  }

  activeRoute(routename: string): boolean{
      return this._router.url.indexOf(routename) > -1;
  }
}