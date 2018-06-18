import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReceipts, fetchUsers, fetchCourses } from '../actions';
import _ from 'lodash';
import ReceiptList from './receipt_list';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchReceipts();
    this.props.fetchUsers();
    this.props.fetchCourses();
  }
  renderCashValue() {
    // console.log('1.renderCashValue()');
    const UserReceipts = this.props.receipts;
    // console.log('UserReceipts:', UserReceipts);

    // method1. SumCashValue By TotalCashFlow
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
    // console.log('TotalCashFlow:', CashValue);
    const SumCashValueByTotalCashFlow = _.sum(CashValue);
    // console.log('SumCashValueByTotalCashFlow:', SumCashValueByTotalCashFlow);

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
    const SumCashValueByHistory = _.sumBy(IAP_Historys, 'Value');
    // console.log('SumCashValueByHistory:', SumCashValueByHistory);

    // Compare two value: if not equal, return error (something wrong!!!)
    if (SumCashValueByTotalCashFlow == SumCashValueByHistory) {
      // console.log('if pass, LINE Notify!');
      // if (!SumCashValueByTotalCashFlow && !SumCashValueByHistory) {
      //   return 'N/A';
      // }

      return SumCashValueByHistory;
    } else {
      // console.log('CashValue: ByTotalCashFlow =/= ByHistory');
      // console.log('ByTotalCashFlow:', SumCashValueByTotalCashFlow);
      // console.log('ByHistory:', SumCashValueByHistory);
      return 'N/A';
    }
  }

  renderRewardPoints() {
    // console.log('2.renderRewardPoints()');
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
    // console.log('3.renderUsers()');
    const Users = this.props.users;
    // console.log('Users:', Users);
    return _.size(Users);
  }

  renderPaymentUsers() {
    const UserReceipts = this.props.receipts;

    const PaymentUsers = _.map(UserReceipts, receipt => {
      // for hasKey: true
      if (receipt === true) {
        console.log('error handling for hasKey: true.');
        return 0;
      }
      // for Reciept without key: 'CashValue'
      if (receipt.Total.CashValue === undefined) {
        // console.log('CashValue = undefined');
        return 0;
      } else if (receipt.Total.CashValue === 0) {
        // console.log('CashValue = 0');
        return 0;
      } else {
        return 1;
      }
    });
    return _.sum(PaymentUsers);
  }

  renderRemainingPointsUsers() {
    const UserReceipts = this.props.receipts;

    const RemainingPointsUsers = _.map(UserReceipts, receipt => {
      // for hasKey: true
      if (receipt === true) {
        console.log('error handling for hasKey: true.');
        return 0;
      }
      // for Reciept without key: 'CashValue'
      if (receipt.Total.RewardPoints === undefined) {
        // console.log('RewardPoints = undefined');
        return 0;
      } else if (receipt.Total.RewardPoints === 0) {
        // console.log('RewardPoints = 0');
        return 0;
      } else {
        return 1;
      }
    });
    return _.sum(RemainingPointsUsers);
  }

  renderAvgRemainingPoints() {
    const UserReceipts = this.props.receipts;

    const RemainingPointsUsers = _.map(UserReceipts, receipt => {
      // for hasKey: true
      if (receipt === true) {
        console.log('error handling for hasKey: true.');
        return 0;
      }
      // for Reciept without key: 'CashValue'
      if (receipt.Total.RewardPoints === undefined) {
        // console.log('RewardPoints = undefined');
        return 0;
      } else if (receipt.Total.RewardPoints === 0) {
        // console.log('RewardPoints = 0');
        return 0;
      } else {
        return 1;
      }
    });

    const RewardPoints = _.map(UserReceipts, receipt => {
      if (receipt === true) {
        // for hasKey: true
        return null;
      }
      return receipt.Total.RewardPoints;
    });
    // console.log(RewardPoints);

    if (_.sum(RemainingPointsUsers) === 0) {
      return 0;
    } else {
      return _.sum(RewardPoints) / _.sum(RemainingPointsUsers);
    }
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
        <h3>關鍵指標</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>加值金額(NTD)</th>
              <th>剩餘點數</th>
              <th>註冊用戶</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.renderCashValue()}</th>
              <th>{this.renderRewardPoints()}</th>
              <th>{this.renderUsers()}</th>
            </tr>
          </tbody>
        </table>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>付費用戶</th>
              <th>持點用戶</th>
              <th>平均持點</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.renderPaymentUsers()}</th>
              <th>{this.renderRemainingPointsUsers()}</th>
              <th>{this.renderAvgRemainingPoints()}</th>
            </tr>
          </tbody>
        </table>
        <h3>課程列表</h3>
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
        <h3>交易紀錄</h3>
        <ReceiptList />
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
