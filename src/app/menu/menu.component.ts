import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';
import {MenuFoodItem} from './menu-food-item';
import {Menu} from './menu';
import {ClrOptions} from '@clr/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [HttpClient]
})
export class MenuComponent implements OnInit {
  @ViewChild('clrOptions') clrOptions: ClrOptions<Product>;

  selectedProduct: Product;
  grams: number;
  selectedProductCarbs: number;
  currentMenuItem: MenuFoodItem;
  currentMenu: Menu;

  products: Product[];

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.currentMenu = new Menu();

    this.httpClient.get('assets/data/food.json')
      .subscribe(food => {
        this.products = food as Product[];
      });
  }

  calculateCarbsForFood(): void {
    this.selectedProductCarbs = Math.trunc(this.selectedProduct.kh100 / 100 * this.grams * 100) / 100;
    this.currentMenuItem = new MenuFoodItem();
    this.currentMenuItem.foodName = this.selectedProduct.name;
    this.currentMenuItem.foodKh = this.selectedProductCarbs;
    this.currentMenuItem.foodQuantity = this.grams;
  }

  recalculateProduct(): void {

  }

  onAddToMenu(): void {
    this.currentMenu.menuItemList.push(this.currentMenuItem);
    this.recalculateMenu();
    this.clrOptions.searchText(null);
  }

  recalculateMenu(): void {
    let totalCarbs = 0;
    this.currentMenu.menuItemList.forEach(
      item => totalCarbs = totalCarbs + item.foodKh
    );

    this.currentMenu.totalCarbs = Math.round(totalCarbs * 100 ) / 100;
  }

  onRemove(item: MenuFoodItem): void {
    const index = this.currentMenu.menuItemList.findIndex(
      current => current.foodName === item.foodName && current.foodKh === current.foodKh
    );
    if (index > -1  ) {
      this.currentMenu.menuItemList.splice(index, 1);
  }


  }
}
