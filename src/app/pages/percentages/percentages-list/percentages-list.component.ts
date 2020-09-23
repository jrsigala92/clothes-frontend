import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Percentage } from 'src/app/shared/interfaces/percentage';
import { PercentageService } from 'src/app/shared/services/percentage.service';

@Component({
  selector: 'app-percentages-list',
  templateUrl: './percentages-list.component.html',
  styleUrls: ['./percentages-list.component.css']
})
export class PercentagesListComponent implements OnInit {
  percentages: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Cantidad', field: 'quantity'}
  ];

  @Input() data: Percentage[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private percentagesService: PercentageService) { }

  ngOnInit(): void {
    this.getPercentages();
  }

  getPercentages() {
    this.percentagesService.getAll().subscribe((response) =>{
      console.log(response);
      this.percentages = response;
    }, (err) => {
      console.error(err);
    });
   }

  openUser(id: number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }

   handlePercentageSelect(percentage: Percentage){
     this.router.navigate([percentage.id], {
       relativeTo: this.activatedRoute
     });
   }
   async handlePercentageDelete(percentage: Percentage){
    await this.percentagesService.delete(percentage.id).subscribe((response) => {
      console.log(response);
      this.percentagesService.getAll().subscribe( (x) => {
        this.percentages = x;
      });
    }, (err) => {
      console.error(err);
    });
  }

}
