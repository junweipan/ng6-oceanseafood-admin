import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service';
import { Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  servers = [
    {
      status: 'true'
    }
  ];
  constructor(private authService: AuthService,
              private router: Router,
              private tostr: ToastrService) { }

  ngOnInit() {
    this.tostr.info('Please be patient',
      'Data loading...', {
      timeOut: 3000
    });
  }
  onSave(tag: string) {
    console.log('TO do');
    // this.servers[0].status = tag;
    // this.switchService.storeServers(this.servers)
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error) => console.log(error)
    //   );
  }
  // onGet() {
  //   this.switchService.getServers()
  //     .subscribe(
  //       (servers: any[]) => this.servers = servers,
  //       (error) => console.log(error)
  //     );
  // }
  logout() {
    this.authService.loggedIn = false;
    this.router.navigate(['/']);
  }

}
