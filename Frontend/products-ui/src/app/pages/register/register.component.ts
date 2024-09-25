import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    private http: HttpClient
  ) {}

  //password code
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    let user = this.signInForm.value;
    if (user.username == '' || user.email == '' || user.password == '') {
      Swal.fire('Error', 'Please Enter all the fields');
    }
    if (this.signInForm.invalid) {
      Swal.fire('Error', 'Invalid data');
    }
    else{
    console.log('navigating');
    this.userService.validateUser(user).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }
  }
}
