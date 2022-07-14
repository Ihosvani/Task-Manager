import { Component, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private readonly $userService: UserService,
    private readonly $apollo: Apollo,
    private readonly $storageMap: StorageMap
    ) { }

  ngOnInit(): void {

  }

  public get user(){
    let Storeduser;
    this.$userService.user.subscribe((user) => {
      Storeduser = user;
    })
    return Storeduser;
  }

  logout()
  {
    if(this.$userService.logout()){
      this.$apollo.getClient().resetStore();
      this.$storageMap.clear().subscribe(() => {});
    }

  }

}
