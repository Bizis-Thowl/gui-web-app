import React from 'react';
import Plot from 'react-plotly.js';
import { label_assignment } from '../constants';

export default function HistTimePlot(props) {

    const { timestamps, preds } = props
    const moving_average_n = parseInt(10 * timestamps.length / 144)
    const averaged = getAverageList(preds, moving_average_n);

    return(
        <Plot

        data={[

          {
            name: "Predictions",

            x: timestamps,

            y: preds.map(value => label_assignment[value]),

            type: 'scatter',

            mode: 'markers',

            marker: {color: 'red', size: 2},

          },
          {
            name: "Moving Average (" + moving_average_n + ")",

            x: timestamps,

            y: averaged,

            line: {

              dash: 'dot',

              width: 2,
              color: "blue"

            },

            // marker: {color: 'blue', size: 2},

          }

        ]}

        layout={ {width: 640, height: 480, title: 'Detail-Sicht',     
        "yaxis": {
            // "categoryorder": "array",
            // "categoryarray":  ["low", "low-med", "medium", "med-high", "high"]
            ticktext: Object.keys(label_assignment),
            tickvals: Object.values(label_assignment)
        }
        }}

      />
    )
}

const getAverageList = (preds, n=10) => {

  const averaged_preds = []

  for (let i in preds) {
    const num = parseInt(i) + 1
    let values_of_interest = []
    if (num >= n) {
      values_of_interest = preds.slice(num - n, num)
    } else {
      values_of_interest = preds.slice(0, num)
    }
    const avg = getAverage(values_of_interest)
    averaged_preds[i] = avg
  }

  return averaged_preds
}

const getAverage = (list) => {

  let sum = 0

  for (let elem of list) {
    sum += parseInt(label_assignment[elem])
  }

  return sum/list.length
}