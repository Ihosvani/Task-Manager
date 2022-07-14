import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matching } from './matching';
import { backendUrl } from 'src/app/url';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hasErrors = new BehaviorSubject(false);
  error: string;

  constructor(
    private readonly $fb: FormBuilder,
    private readonly $router: Router,
    private readonly $http: HttpClient
  ) { }

  registerForm = this.$fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',
    [Validators.required,
    Validators.minLength(8),
    Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&*@^])/),]
    ],
    confirmPassword: ['', [Validators.required, matching('password')]]
  })


  ngOnInit(): void {}


  onSubmit(){

    if(this.registerForm.valid){
      let payload = {
        name: this.registerForm.get('name').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      }
      this.$http.post(backendUrl + '/auth/register', payload).subscribe(
        (result:any) => {
        if(result.response?.error)
        {
          this.hasErrors.next(true);
          this.error = result.response?.message;
        }
        else{
          this.$router.navigateByUrl('/login')
        }
      })
    }
  }



}
