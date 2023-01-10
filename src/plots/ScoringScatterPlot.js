import React from 'react';
import Plot from 'react-plotly.js';
import { label_assignment } from '../constants';

export default function ScoringScatterPlot(props) {

    const lookback = 10

    const { timestamps, preds, closest, scores } = props
    const [cut_timestamps, cut_preds, cut_closest, cut_scores] = [
        timestamps.slice(1).slice(-lookback), 
        preds.slice(1).slice(-lookback), 
        closest.slice(1).slice(-lookback),
        scores.slice(1).slice(-lookback)
    ]

    return(
        <Plot

        data={[

          {
            name: "Vorhersage",

            x: cut_timestamps,

            y: cut_preds.map(value => label_assignment[value]),

            type: 'scatter',

            mode: 'markers',

            marker: {color: 'red', size: 8},

          },
          {
            name: "Vorhersage in der Nähe",

            x: cut_timestamps,

            y: cut_closest.map(value => label_assignment[value]),

            type: 'scatter',

            mode: 'markers',

            marker: {color: 'blue', size: 5},

          },
          {
            name: "Vertrauens-Score",

            x: cut_timestamps,

            y: cut_scores,

            yaxis: 'y2',

            type: 'scatter',

            line: {

                dash: 'dot',
                width: 4,
                color: "green"

            },

            mode: "lines"

            // marker: {color: 'green', size: 8},

          }

        ]}

        layout={ {width: 640, height: 480, title: 'Vertrauens-Score',     
        "yaxis": {
            // "categoryorder": "array",
            // "categoryarray":  ["low", "low-med", "medium", "med-high", "high"]
            ticktext: Object.keys(label_assignment),
            tickvals: Object.values(label_assignment),
        },
        "yaxis2": {
            // ticktext: Object.keys(label_assignment),
            // tickvals: Object.values(label_assignment),
            overlaying: 'y',
            range: [0, 2],
            side: 'right',
            tickfont: {color: 'green'},
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