import { Component } from '@angular/core';
import { Menu, MenuItems } from '../shared/menu-items/menu-items';
declare function  initializeDashboard() :void;

@Component({
  selector: 'app-menutest',
  templateUrl: './menutest.component.html',
  styleUrls: ['./menutest.component.css']
})
export class MenutestComponent {
  menuItems: Menu[] = [];

  constructor(private menuService: MenuItems) {
    //this.menuItems = this.menuService.getMenuitem();
  }
  ngOnInit() {
    initializeDashboard();

  }
}
