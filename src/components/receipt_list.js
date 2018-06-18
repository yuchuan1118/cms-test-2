import React, { Component } from 'react';
import { fetchServerReceipts } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class ReceiptList extends Component {
  componentDidMount() {
    this.props.fetchServerReceipts();
  }

  renderReceipts() {
    return _.map(this.props.server_receipts, receipt => {
      return (
        <tr key={receipt.ReceiptId}>
          <td>{receipt.Time}</td>
          <td>{receipt.Uid}</td>
          <td>{receipt.CashType}</td>
          <td>
            {receipt.Value} {receipt.Unit}{' '}
          </td>
        </tr>
      );
    });
  }

  render() {
    // console.log(this.props.server_receipts);
    return (
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
    );
  }
}

function mapStateToProps(state) {
  return {
    server_receipts: state.server_receipts
  };
}

export default connect(mapStateToProps, { fetchServerReceipts })(ReceiptList);
