import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username!: string;
  password!: string;
  email!: string;
  phonenumber!: string;
  showpass = false;
  emailPattern =
    '^([a-z0-9\\.\\-]+)@([a-zA-z]+)(\\.[a-zA-z]{2,4})(\\.[a-zA-z]{2,4})?$';
  passwordPattern = '([A-Z]+)([a-z]+)([@$%&]+)([0-9]+)';
  phonePattern = '(^[6-9])(\\d{9})$';
  constructor(
    private form: FormBuilder,
    private userService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  registerForm = this.form.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    phonenumber: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(this.phonePattern),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern),
      ],
    ],
  });

  onSubmit() {
    const { username, email, phonenumber, password } = this.registerForm.value;
    console.log(this.registerForm.value);
    this.userService
      .userRegister(username, email, password, phonenumber)
      .subscribe({
        next: (data) => {
          console.log(data.msg);
          this.toastr.success(data.msg, '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err.error.msg);
          this.toastr.error(err.error.msg, '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
        },
      });
  }

  show() {
    this.showpass = !this.showpass;
  }
}
