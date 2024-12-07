import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from  '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../auth/auth.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    // RouterOutlet, 
    RouterLink, 
    MatIconModule,
    MatToolbar,
    MatButtonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  private destroySubject = new Subject();
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){
    authService.authStatus.pipe(takeUntil(this.destroySubject)).subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  onLogout() { 
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  
}
