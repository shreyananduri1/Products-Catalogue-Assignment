import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logInForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UsersService, private router: Router){}

  //password code
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    let user = this.logInForm.value;
    console.log(user);
    if (user.email == '' || user.password == '') {
      Swal.fire('Error', 'Please Enter all the fields');
    }
    if (this.logInForm.invalid) {
      Swal.fire('Error', 'Invalid data');
    } 
      console.log('navigating');
      this.userService.loginUser(user).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/home']);
        },
        (error) => {
          // Handle error response here
          Swal.fire('Error', error.error.message || 'User not authenticated');
        }
      );

  }
}
