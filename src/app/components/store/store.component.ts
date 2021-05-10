import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  search: string = '';
  products: Product[] = [];
  // pages!: number;
  // pageNumber: number = 1;
  // paginating: boolean = true;
  searching: boolean = false;
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscribeProductData();
    // this.paginate();
  }

  subscribeProductData(): void {
    this.productsService.listAll().subscribe((data: Product[]) => {
      this.products = data;
      // this.pages = this.numberOfPages(this.products.length);
    });
  }

  // changePage(pageNumber: number, direction: string) {
  //   switch (direction) {
  //     case "previous":
  //       if (pageNumber - 1 >= 0) {
  //         this.pageNumber = pageNumber - 1;
  //         this.productsService.listPagination(this.pageNumber).subscribe(data => this.products = data);
  //         pageNumber === 1 ? this.searching = true : this.searching = false;
  //       } else pageNumber = 1;
  //       break;
  //     case "next":
  //       if (pageNumber < this.pages) {
  //         this.searching = true;
  //         this.pageNumber = pageNumber + 1;
  //         this.productsService.listPagination(this.pageNumber).subscribe(data => this.products = data);
  //       } else pageNumber = this.pages;
  //       break;
  //     default:
  //       return;
  //   }
  // }

  // paginate() {
  //   this.productsService.listPagination(1).subscribe(data => this.products = data);
  // }

  // numberOfPages(productsLength: number): number {
  //   return Math.ceil(productsLength/12);
  // }

  searchProducts(searchFilter: any) {
    
  }

  refreshStock(stock: number): void {
    this.subscribeProductData();
  }

}
