import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './shared/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire';
import {AuthService} from './shared/auth.service';
import {ReserveserviceService} from './shared/reserveservice.service';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ReservationListComponent} from './admin/reservations/reservation-list/reservation-list.component';
import {ReservationComponent} from './admin/reservations/reservation/reservation.component';
import {ReservationsComponent} from './admin/reservations/reservations.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', // canActivate: [AuthGuard],
    component: AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    ReservationsComponent,
    ReservationComponent,
    ReservationListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule
  ],
  providers: [AuthService, AuthGuard, ReserveserviceService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
