import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Size } from 'src/app/shared/interfaces/size';
import { SizeService } from 'src/app/shared/services/size.service';

@Component({
  selector: 'app-sizes-list',
  templateUrl: './sizes-list.component.html',
  styleUrls: ['./sizes-list.component.css']
})
export class SizesListComponent implements OnInit {
  sizes: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
  ]

  @Input() data: Size[];
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private sizesService:SizeService) { }

  ngOnInit(): void {
    this.getSizes();
  }

  async getSizes() {
   await this.sizesService.getAll().subscribe((response) => {
      console.log(response);
      this.sizes = response;
    }, (err) => {
      console.error(err);
    });
   }

  openUser(id: number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }

   handleSizeSelect(service: Size){
     this.router.navigate([service.id], {
       relativeTo: this.activatedRoute
     });
   }

   async handleSizeDelete(service: Size){
    await this.sizesService.delete(service.id).subscribe((response) => {
      console.log(response);
      this.sizesService.getAll().subscribe( (x) => {
        this.sizes = x;
      });
    }, (err) => {
      console.error(err);
    });
  }

}
