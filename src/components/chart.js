import React from 'react';
import _ from 'lodash';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines';

function average(data) {
  return _.round(_.sum(data) / data.length);
}

export default function(props) {
  return (
    <div>
      <Sparklines height={130} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
      <div>
        {average(props.data)} {props.unit}
      </div>
    </div>
  );
}

{
  /* <Chart data={[1, 20, 3, 4, 5]} color="orange" unit="K" /> */
}
