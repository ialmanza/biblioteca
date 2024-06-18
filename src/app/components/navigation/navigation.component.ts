import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [MenuComponent, DashboardComponent]
})
export class NavigationComponent {

}
