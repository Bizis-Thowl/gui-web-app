import { Box } from "@mui/material";
import React from "react";
import Plot from "react-plotly.js";

export default function ShapPieChart(props) {
  const { shapValues, featureOrder } = props;

  let myValues;
  let myFeatures;

  if (featureOrder) {
    myValues = [];
    for (let feature of featureOrder) {
      myValues.push(shapValues.find((v) => v.feature === feature).shapvalue);
    }
    myFeatures = featureOrder.map((v) => v.slice(0, 12));
  } else {
    myValues = shapValues.map((v) => v.shapvalue);
    myFeatures = shapValues.map((v) => v.feature.slice(0, 12));
  }

  const myColors = myValues.map((v) => {
    if (v > 0) return "green";
    else return "red";
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Plot
        data={[
          {
            y: myValues,

            x: myFeatures,
            type: "bar",
            marker: {
              color: myColors,
            },
            hovertemplate: "%{x}: %{y:.3f}<extra></extra>",
          },
        ]}
        layout={{
          width: 200,
          height: 200,
          showlegend: false,
          margin: { t: 0, b: 0, l: 0, r: 0 },
          plot_bgcolor: "lightgrey",
          paper_bgcolor: "lightgrey",
        }}
        config={{
            displayModeBar: false
        }}
      />
    </Box>
  );
}
