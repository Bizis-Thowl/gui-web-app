import React from 'react';
import Plot from 'react-plotly.js';

export default function HistBarPlot(props) {

    const { preds } = props

    const counts = getArrayCounts(preds)

    const X = Object.keys(counts)
    const y = Object.values(counts)

    return(
        <Plot

        data={[

          {

            x: X,

            y: y,

            type: 'bar',

            mode: 'lines+markers',

            marker: {color: 'red'},

          },

        ]}

        layout={ {width: 640, height: 480, title: 'Häufigkeitsverteilung',    
        "xaxis": {
            "categoryorder": "array",
            "categoryarray":  ["low", "low-med", "medium", "med-high", "high"]
        }} }

      />
    )
}

function getArrayCounts(arr) {
    const counts = {};
    for (const elem of arr) {
        counts[elem] = counts[elem] ? counts[elem] + 1 : 1;
      }
    return counts
}
