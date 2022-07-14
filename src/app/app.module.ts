import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AuthModule } from './auth/auth.module';
// import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { UserService } from './user/user.service';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloLink, InMemoryCache} from '@apollo/client/core';
import { StorageMap, StorageModule } from '@ngx-pwa/local-storage';
import { backendUrl } from './url';
import { setContext } from '@apollo/client/link/context';


export const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    CreateTaskComponent
  ],
  imports: [
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthModule,
    // GraphQLModule,
    HttpClientModule,
    StorageModule.forRoot({
      IDBDBName: 'Task-Manager',
      IDBDBVersion: 1
    }),
  ],
  providers: [
    UserService,
    {
      provide: APOLLO_CACHE,
      useValue: new InMemoryCache()
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
   },
  {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink, storage: StorageMap) => {

      const basic = setContext((operation, context) => ({
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Accept: 'charset=utf-8'
        }
      }));
      const auth = setContext((operation, context) => {

        storage.get('token').subscribe((tokenFromStorage: any) => {
          console.log(tokenFromStorage)
          if(tokenFromStorage == null){
            return {}
          }
          else{
            return {
              headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${tokenFromStorage}`
              }
            };
          }});

      });
      const link = ApolloLink.from([
        basic,
        auth,
        httpLink.create({ uri: backendUrl + "/graphql" })
      ]);

      return {
        cache: new InMemoryCache(),
        link
      };
    },

    // deps: [HttpLink]

    deps: [HttpLink, StorageMap, APOLLO_CACHE]

  },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
