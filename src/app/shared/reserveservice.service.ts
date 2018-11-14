import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Reservation  } from './reservation.model';
@Injectable()
export class ReserveserviceService {
  reservationList: AngularFireList<any>;
  selectedReservation: Reservation = new Reservation();
   constructor(private firebase: AngularFireDatabase) {
   }
   getData() {
    this.reservationList = this.firebase.list('reservations');
    return this.reservationList;
    }
    insertReservation(reservation: Reservation) {
      const datetime = new Date(new Date(reservation.book_date).toDateString()).getTime().toString();
      const orig_status = 'Unconfirmed';
      const new_submitted_time = new Date().toString();
      if (reservation.book_message == null) {
        reservation.book_message = 'no message left';
      }
      this.reservationList.push({
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        no_of_children: reservation.no_of_children,
        no_of_people: reservation.no_of_people,
        phone: reservation.phone,
        book_date: datetime,
        session: reservation.session,
        book_message: reservation.book_message,
        confirm_status: orig_status,
        submitted_time: new_submitted_time,
        deleteFlag: 'false'
        // colum1: reservation.colum1,
        // colum2: reservation.colum2,
        // colum3: reservation.colum3
      });
    }
    updateReservation(reservation: Reservation) {
       //  const datetime = new Date(new Date(reservation.book_date).toDateString()).getTime().toString();
      // console.log('input date:' + reservation.book_date);
      // console.log('update:' + datetime);
      this.reservationList.update(reservation.$key, {

        first_name: reservation.first_name,
        last_name: reservation.last_name,
        no_of_children: reservation.no_of_children,
        no_of_people: reservation.no_of_people,
        phone: reservation.phone,
        book_date: reservation.book_date,
        session: reservation.session,
        book_message: reservation.book_message,
        confirm_status: reservation.confirm_status,
        submitted_time: reservation.submitted_time,
        deleteFlag: reservation.deleteFlag
        // colum1: reservation.colum1,
        // colum2: reservation.colum2,
        // colum3: reservation.colum3
      });
    }
    deleteReservation($key: string) {
      this.reservationList.remove($key);
    }


}
