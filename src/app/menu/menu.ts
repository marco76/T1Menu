import {MenuFoodItem} from './menu-food-item';


export class Menu {

  constructor() {
    this.menuItemList = [];
    this.totalCarbs = 0;
  }
    public menuItemList: MenuFoodItem[];
    public totalCarbs: number;
}
