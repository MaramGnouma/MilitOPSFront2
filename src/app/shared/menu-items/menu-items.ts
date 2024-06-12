import { Injectable } from '@angular/core';
import { Routes } from '@angular/router'; // Ajout de l'import pour Routes

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: Menu[];
  isActive?: boolean; 
  expanded?: boolean; // Nouvelle propriété pour suivre l'état d'expansion

}

const MENUITEMS = [
  { state: 'users', name: 'Mission Agents Waiting ', type: 'link', icon: 'account_circle' },
  { state: 'users_approuves', name: 'Approved Mission Agents', type: 'link', icon: 'person' },

  { state: 'equipements', name: 'Equipment', type: 'link', icon: 'devices' , expanded :false,
  children: [
    { state: 'montre_connecte', name: 'Smartwatch ', type: 'link', icon: 'watch', expanded :false },
    { state: 'camera', name: 'Camera', type: 'link', icon: 'camera_alt', expanded :false },

  ]},
  { state: 'materiels', name: 'Materiels Terrain ', type: 'link', icon: 'local_police' },
  { state: 'soldats', name: 'Soldats ', type: 'link', icon: 'local_police' },



 
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
  toggleMenu(menuitem: Menu): void {
    if (menuitem.children && menuitem.children.length > 0) {
      menuitem.expanded = !menuitem.expanded; // Inverser l'état d'expansion
    }
  }
}
