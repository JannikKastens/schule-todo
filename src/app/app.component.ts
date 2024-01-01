import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MessageBoxComponent } from "./message-box/message-box.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, MessageBoxComponent]
})
export class AppComponent {
  title = 'schule-todo';
  isRouteListe = false;
  showSidebar = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.isRouteListe = (router.url === '/');
    });
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
