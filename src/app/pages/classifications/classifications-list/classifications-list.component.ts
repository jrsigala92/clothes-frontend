import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Classification } from 'src/app/shared/interfaces/classification';
import { ClassificationService } from 'src/app/shared/services/classification.service';

@Component({
  selector: 'app-classifications-list',
  templateUrl: './classifications-list.component.html',
  styleUrls: ['./classifications-list.component.css']
})
export class ClassificationsListComponent implements OnInit {
  classifications: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Descripción', field: 'description'}
  ]

  @Input() data: Classification[];
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private classificationsService:ClassificationService) { }

  ngOnInit(): void {
    this.getClassifications();
  }

  async getClassifications() {
   await this.classificationsService.getAll().subscribe((response) => {
      console.log(response);
      this.classifications = response;
    }, (err) => {
      console.error(err);
    });
   }

  openUser(id: number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }

   handleClassificationSelect(classification: Classification){
     this.router.navigate([classification.id], {
       relativeTo: this.activatedRoute
     });
   }

   async handleClassificationDelete(classification: Classification){
    await this.classificationsService.delete(classification.id).subscribe((response) => {
      console.log(response);
      this.classificationsService.getAll().subscribe( (x) => {
        this.classifications = x;
      });
    }, (err) => {
      console.error(err);
    });
  }

}
