import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'}
  ]

  @Input() data:Category[];
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private categoriesService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAll().subscribe((response) =>{
      console.log(response);
      this.categories = response;
    }, (err) =>{
      console.error(err);
    });
   }

  openUser(id:number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }
 
   handleCategorySelect(category:Category){
     this.router.navigate([category.id], {
       relativeTo: this.activatedRoute
     });
   }

}
