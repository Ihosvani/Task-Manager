import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Apollo, gql } from 'apollo-angular';
import { backendUrl } from 'src/app/url';
import { UserService } from 'src/app/user/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasErrors = new BehaviorSubject(false);
  error: string;

  constructor(private $formBuilder: FormBuilder,
    private readonly $router: Router,
    private readonly $http: HttpClient,
    private readonly $storageMap: StorageMap,
    private readonly $apollo: Apollo,
    private readonly $userService: UserService) { }

  loginForm = this.$formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',
    [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&*@^])/),]]
  })

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }

    this.$http.post( backendUrl + '/auth/login', this.loginForm.getRawValue()).subscribe(
      (result: any) => {
        this.$storageMap.set('token', result.token).subscribe(() => {});
        this.$apollo.query({
          query: gql`
          {
              user {
              id,
              name,
              email
            }
          }
          `
        }).subscribe(
          (result:any) => {
            this.$storageMap.set('user', result.data.user).subscribe(() => {})
            this.$userService.login(result.data.user);
            this.$router.navigateByUrl('/')
          }
        )
      },
      (error) => {
        this.hasErrors.next(true);
        this.error = error.error.message;
        return
      }
    )
  }
  ngOnInit(): void {
  }

}
