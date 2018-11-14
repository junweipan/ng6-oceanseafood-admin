import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../../shared/reservation.model';
import {ToastrService} from 'ngx-toastr';
import {OrderPipe} from 'ngx-order-pipe';
import {ReserveserviceService} from '../../../shared/reserveservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  new_book_date = '';
  old_book_date = '';
  deleteFlag = false;
  reservationList: Reservation[];

  order = 'submitted_time';
  reverse = false;
  sortedCollection: any[];
  p = 1;
  confirm_status2 = '';
  constructor(private reservationservice: ReserveserviceService,
              private tostr: ToastrService,
              private router: Router,
              private orderPipe: OrderPipe) {

    const x = this.reservationservice.getData();
    x.snapshotChanges().subscribe(item => {
      this.reservationList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        // transfer string to boolean, to control check box
        if (y['deleteFlag'] === 'false') {
          y['deleteFlag'] = false;
        } else if (y['deleteFlag'] === 'true') {
          y['deleteFlag'] = true;
        }
        // console.log('before:' + y['submitted_time']);
        // y['submitted_time'] = new Date(y['submitted_time']).getTime();
        // console.log('after:' + y['submitted_time']);
        // y['book_date'] = new Date(new Date(y['book_date']).getTime()).toDateString();
        // console.log(y['book_date']);
        this.reservationList.push(y as Reservation);
      });
    });
    this.sortedCollection = orderPipe.transform(this.reservationList, 'info.name');
    // console.log(this.reservationList);
  }

  ngOnInit() {
    // console.log('today:' +  new Date().toString().substr(4, 11));

  }
  onBulkDelete() {
    // if the key is null, it is a new item, use insert, else use update
    const keys = [];
    this.reservationList.forEach((reservation) => {
      if (reservation.deleteFlag) {
        keys.push(reservation.$key);
      }
    });
    if (keys.length === 0) {
      this.tostr.warning('No Deleting record Selected', 'Choose Record');
      return;
    }
    console.log(keys);
    if (confirm('Are you sure to delete all records ? ') === true) {
      keys.forEach((key) => {
        this.reservationservice.deleteReservation(key);
      });
    }
    this.tostr.warning('Deleted Successfauly', 'Reservarion register');
  }
  showUnconfirmed() {
    this.confirm_status2 = 'Unconfirmed';
  }
  onEdit(reservation: Reservation) {
    // console.log(reservation);
    this.reservationservice.selectedReservation = Object.assign({}, reservation);
    //  console.log(this.reservationservice.selectedReservation);
  }
  onDelete($key: string) {
    if (confirm('Are you sure to delete this record ? ') === true) {
      this.reservationservice.deleteReservation($key);
      this.tostr.warning('Deleted Successfauly', 'Reservarion register');
    }
  }
  serachByDate() {
    this.new_book_date = '';
    this.confirm_status2 = '';
    if (this.old_book_date === null) {
      this.old_book_date = '';
    }
    this.new_book_date = new Date(new Date(this.old_book_date).toDateString()).getTime().toString();
    // console.log(this.new_book_date);
    // console.log(this.new_book_date);
    // const searchDay = this.book_date.substr(0, 15);
  }
  listAll() {
    this.new_book_date = '';
    this.confirm_status2 = '';
  }
  setOrder(value: string) {

    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    console.log(value);
    this.order = value;
  }
  refresh() {
    window.scrollTo(0, 100);
    setTimeout(() => {
      this.tostr.info('Retrieved the latest Data', 'Database updated');
      window.scrollTo(0, 0);
    }, 1500);
    this.listAll();
  }
}
