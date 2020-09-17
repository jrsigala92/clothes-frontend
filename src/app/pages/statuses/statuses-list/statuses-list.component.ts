import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/shared/interfaces/status';
import { StatusService } from 'src/app/shared/services/status.service';

@Component({
  selector: 'app-statuses-list',
  templateUrl: './statuses-list.component.html',
  styleUrls: ['./statuses-list.component.css']
})
export class StatusesListComponent implements OnInit {
  statuses: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Descripción', field: 'description'}
  ]

  @Input() data: Status[];
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private statusesService:StatusService) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.statusesService.getAll().subscribe((response) =>{
      console.log(response);
      this.statuses = response;
    }, (err) =>{
      console.error(err);
    });
   }

  openUser(id: number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }

   handleStatusSelect(status: Status){
     this.router.navigate([status.id], {
       relativeTo: this.activatedRoute
     });
   }

}
