import React, { Component } from 'react';
import { fetchServerReceipts } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class ReceiptList extends Component {
  componentDidMount() {
    this.props.fetchServerReceipts();
  }

  renderReceipts() {
    const { server_receipts } = this.props;
    return _.reverse(
      _.map(server_receipts, (receipt, ReceiptUid) => {
        return (
          <tr key={ReceiptUid}>
            <td>{receipt.Time}</td>
            <td>{receipt.Uid}</td>
            <td>{receipt.CashType}</td>
            <td>
              {receipt.Value} {receipt.Unit}{' '}
            </td>
          </tr>
        );
      })
    );
  }

  receiptSyncCheck() {
    // server_receipts
    const { server_receipts } = this.props;
    var ServerReceiptIAP = 0;
    var ServerReceiptPoint = 0;
    var ServerReceiptBuyCourse = 0;
    var ServerReceiptExchangeCourse = 0;
    _.forEach(server_receipts, receipt => {
      // console.log(receipt.CashType);
      if (receipt.CashType == 'IAP入帳') {
        ServerReceiptIAP++;
      } else if (receipt.CashType == '點數轉換') {
        ServerReceiptPoint++;
      } else if (receipt.CashType.includes('購買課程')) {
        ServerReceiptBuyCourse++;
      } else if (receipt.CashType.includes('兌換課程')) {
        // console.log('server_receipt:', receipt);
        ServerReceiptExchangeCourse++;
      }
    });
    // console.log('ServerReceiptIAP:', ServerReceiptIAP);
    // console.log('ServerReceiptPoint:', ServerReceiptPoint);
    // console.log('ServerReceiptBuyCourse:', ServerReceiptBuyCourse);
    // console.log('ServerReceiptExchangeCourse:', ServerReceiptExchangeCourse);

    // user_receipts
    const { receipts: user_receipts } = this.props;
    // console.log('user_receipts:', user_receipts);
    var UserReceiptIAP = 0;
    var UserReceiptPoint = 0;
    var UserReceiptBuyCourse = 0;
    var UserReceiptExchangeCourse = 0;
    _.map(user_receipts, receipt => {
      _.map(receipt.History, History => {
        if (History.CashType == 'IAP入帳') {
          UserReceiptIAP++;
        } else if (History.CashType == '點數轉換') {
          UserReceiptPoint++;
        } else if (History.CashType.includes('購買課程')) {
          UserReceiptBuyCourse++;
        } else if (History.CashType.includes('兌換課程')) {
          UserReceiptExchangeCourse++;
        }
      });
    });

    // console.log('UserReceiptIAP:', UserReceiptIAP);
    // console.log('UserReceiptPoint:', UserReceiptPoint);
    // console.log('UserReceiptBuyCourse:', UserReceiptBuyCourse);
    // console.log('UserReceiptExchangeCourse:', UserReceiptExchangeCourse);
    if (
      ServerReceiptIAP == UserReceiptIAP &&
      ServerReceiptPoint == UserReceiptPoint &&
      // '兌換課程emoannoyed' and '兌換課程coupleachieved' are included in '購買課程' before around 6/16(?)
      // , so we cannot sync '購買課程'
      // ServerReceiptBuyCourse == UserReceiptBuyCourse &&
      ServerReceiptExchangeCourse == UserReceiptExchangeCourse
    ) {
      return 'OK';
    } else {
      // console.log('ServerReceiptIAP:', ServerReceiptIAP);
      // console.log('ServerReceiptPoint:', ServerReceiptPoint);
      // console.log('ServerReceiptExchangeCourse:', ServerReceiptExchangeCourse);

      // console.log('UserReceiptIAP:', UserReceiptIAP);
      // console.log('UserReceiptPoint:', UserReceiptPoint);
      // console.log('UserReceiptExchangeCourse:', UserReceiptExchangeCourse);
      return 'NG';
    }
  }

  render() {
    // console.log(this.props.server_receipts);
    return (
      <div>
        <h6>資料同步: {this.receiptSyncCheck()}</h6>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Uid</th>
              <th>CashType</th>
              <th>Value (Unit)</th>
            </tr>
          </thead>
          <tbody>{this.renderReceipts()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    server_receipts: state.server_receipts,
    receipts: state.receipts
  };
}

export default connect(mapStateToProps, { fetchServerReceipts })(ReceiptList);
