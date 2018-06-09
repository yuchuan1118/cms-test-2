import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReceipts, fetchUsers, fetchCourses } from '../actions';
import _ from 'lodash';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchReceipts();
    this.props.fetchUsers();
    this.props.fetchCourses();
  }
  renderCashValue() {
    const UserReceipts = this.props.receipts;
    // console.log('UserReceipts:', UserReceipts);

    // method1. SumCashValue By TotalRewardPoints
    const CashValue = _.map(UserReceipts, receipt => {
      // for hasKey: true
      if (receipt === true) {
        // console.log('error handling for hasKey: true.');
        return null;
      }
      // for Reciept without key: 'CashValue'
      if (receipt.Total.CashValue === undefined) {
        return 0;
      }
      return receipt.Total.CashValue;
    });
    // console.log('CashValue:', CashValue);
    const SumCashValueByTotalRewardPoints = _.sum(CashValue);

    // method2. SumCashValue By History
    // const UserReceipts = this.props.receipts;
    var IAP_Historys = [{ Value: 0 }]; // init Value:0, error handle for reset database
    _.map(UserReceipts, UserReceipt => {
      _.map(UserReceipt.History, History => {
        if (History.CashType === 'IAP入帳') {
          IAP_Historys = [...IAP_Historys, History];
        }
      });
    });
    // Compare two value: if not equal, return error (something wrong!!!)
    const SumCashValueByHistory = _.sumBy(IAP_Historys, 'Value');
    if (SumCashValueByTotalRewardPoints === SumCashValueByHistory) {
      return SumCashValueByHistory;
    } else {
      // console.log('CashValue: ByTotalRewardPoints =/= ByHistory');
      // console.log('ByTotalRewardPoints:', SumCashValueByTotalRewardPoints);
      // console.log('ByHistory:', SumCashValueByHistory);
      return 'N/A';
    }
  }

  renderRewardPoints() {
    const UserReceipts = this.props.receipts;
    const RewardPoints = _.map(UserReceipts, receipt => {
      if (receipt === true) {
        // for hasKey: true
        return null;
      }
      return receipt.Total.RewardPoints;
    });
    // console.log(RewardPoints);
    return _.sum(RewardPoints);
  }

  renderUsers() {
    const Users = this.props.users;
    // console.log('Users:', Users);
    return _.size(Users);
  }

  renderCourse() {
    return _.map(this.props.courses, course => {
      // console.log('course:', course);
      // console.log('courseTitle:', course.courseTitle);
      return (
        <tr key={course.courseId}>
          <td>{course.courseTitle}</td>
          <td>{course.studentNumber}</td>
          <td>{course.couponExchange}</td>
          <td>{course.couponLimit}</td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.courses) {
      return <div>讀取中...</div>;
    }
    // console.log('courses:', this.props.courses);

    return (
      <div>
        <h1>Comma,</h1>
        <h3>加值金額: {this.renderCashValue()} (NTD)</h3>
        <h3>剩餘點數: {this.renderRewardPoints()} (Points)</h3>
        <h3>註冊人數: {this.renderUsers()}</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>課程名稱</th>
              <th>學生總數</th>
              <th>兌換次數</th>
              <th>兌換上限</th>
            </tr>
          </thead>
          <tbody>{this.renderCourse()}</tbody>
        </table>
      </div>
    );
  }
}
{
  // <tbody>{this.props.courses.map(this.renderCourse)}</tbody>
  /* <tbody>{this.props.weather.map(this.renderWeather)}</tbody> */
}
function mapStateToProps(state) {
  return {
    receipts: state.receipts,
    users: state.users,
    courses: state.courses
  };
}

export default connect(mapStateToProps, {
  fetchReceipts,
  fetchUsers,
  fetchCourses
})(Dashboard);
