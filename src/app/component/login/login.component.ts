import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  showpass = false;
  emailPattern =
    '^([a-z0-9\\.\\-]+)@([a-zA-z]+)(\\.[a-zA-z]{2,4})(\\.[a-zA-z]{2,4})?$';
  constructor(
    private form: FormBuilder,
    private userService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loginForm = this.form.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.userService.userLogin(username, password).subscribe({
      next: (result: any) => {
        console.log(result);
        this.userService.storeUserData(
          result.token,
          result.data.name,
          result.data._id,
          result.refresh,
          result.image,
          result.data.isAdmin
        );
        console.log(result.msg);
        this.toastr.success(result.msg, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        let redirectUrl = localStorage.getItem('url');
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('url');
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
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
