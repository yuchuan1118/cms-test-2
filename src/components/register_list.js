import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
const DateRange = 14;
class RegisterList extends Component {
  DateArray(DateRange) {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    // console.log('today:', today);

    const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
    var DateArr = new Array(DateRange);

    for (var i = 0; i < DateRange; i++) {
      const myDate = new Date();
      myDate.setTime(today.getTime() - msPerDay * i);
      DateArr[i] = myDate;
    }
    return DateArr;
  }

  renderDate() {
    return _.map(this.DateArray(DateRange), date => {
      return (
        <th>
          {date.getMonth() + 1}/{date.getDate()}
        </th>
      );
    });
  }

  RegisterUsersInDate() {
    const DateArr = this.DateArray(DateRange);

    var RegisterUsersInDate = new Array(DateRange).fill(0);

    const { users } = this.props;
    // console.log(users);
    const CreatedAt = _.map(users, user => {
      if (user.CreatedAt != undefined) {
        const UserCreatedAt = new Date(user.CreatedAt);
        for (var i = 0; i < DateRange; i++) {
          if (
            UserCreatedAt.getDate() == DateArr[i].getDate() &&
            UserCreatedAt.getMonth() == DateArr[i].getMonth() &&
            UserCreatedAt.getFullYear() == DateArr[i].getFullYear()
          ) {
            // console.log('UserCreatedAt:', UserCreatedAt);
            // console.log('UserCreatedAt.getDate():', UserCreatedAt.getDate());
            // console.log('UserCreatedAt.getMonth():', UserCreatedAt.getMonth());
            // console.log(`DateArr[${i}]:`, DateArr[i]);
            // console.log(`DateArr[${i}].getDate():`, DateArr[i].getDate());
            // console.log(`DateArr[${i}].getMonth():`, DateArr[i].getMonth());
            // console.log(
            //   `DateArr[${i}].getFullYear():`,
            //   DateArr[i].getFullYear()
            // );
            // console.log('---------------');
            RegisterUsersInDate[i]++;
          }
        }
      }
    });
    // console.log('RegisterUsersInDate:', RegisterUsersInDate);
    return RegisterUsersInDate;
  }
  renderRegisters() {
    return _.map(this.RegisterUsersInDate(), val => {
      return <td>{val}</td>;
    });
  }

  render() {
    this.RegisterUsersInDate();
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>{this.renderDate()}</tr>
          </thead>
          <tbody>
            <tr>{this.renderRegisters()}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(RegisterList);
