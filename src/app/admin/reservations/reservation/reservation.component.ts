import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ReserveserviceService} from '../../../shared/reserveservice.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {


  minDate: Date;
  maxDate: Date;
  constructor(public reservationservice: ReserveserviceService,
              private tostr: ToastrService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 90);
  }
  ngOnInit() {
    this.resetForm();
  }
  onSubmit(reservationForm: NgForm) {
    // if the key is null, it is a new item, use insert, else use update
    console.log(reservationForm.value);
    if (reservationForm.value.$key === null) {
      this.reservationservice.insertReservation(reservationForm.value);
      this.tostr.success('Submitted Successfully', 'Reservation Register');
    } else {
      this.reservationservice.updateReservation(reservationForm.value);
      this.tostr.success('Modified Successfully', 'Reservation Register');
    }
    this.resetForm(reservationForm);
  }
  resetForm(reservationForm?: NgForm) {
    if (reservationForm != null) {
      reservationForm.reset();
    }
    this.reservationservice.selectedReservation = {
      $key: null,
      first_name: '',
      last_name: '',
      no_of_children: '',
      no_of_people: '',
      phone: '',
      book_date: '',
      session: '',
      book_message: '',
      confirm_status: '',
      submitted_time: '',
      deleteFlag: false
    };
  }

}
