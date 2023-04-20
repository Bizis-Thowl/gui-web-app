import {Box, Paper, Typography, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';
import Behaviour from './Behaviour';
import ExaminationChoice from './components/LocalExamination/ExaminationChoice';
import FeatureImportance from './FeatureImportance';
import { fetchAnchors } from './fetching/anchors';
import { fetchCounterfactuals } from './fetching/counterfactuals';
import { fetchForceplot, fetchForceplotMulti } from './fetching/feature_importance';
import { fetchCurrentDp, fetchFeaturelist } from './fetching/general';
import { fetchHistory, fetchHistoryAverage } from './fetching/history';
import { fetchScores } from './fetching/scoring';
import History from './History';
import Trustscores from './Trustscores';

function App() {

  const [features, setFeatures] = useState([])
  const [currentDp, setCurrentDp] = useState([])
  const [trustscores, setTrustscores] = useState({
      "predicted_classes": [],
      "closest_classes": [],
      "scores": []
  })
  const [anchors, setAnchors] = useState({
    "anchors": [],
    "precisions": [],
    "coverages": [],
    "dps": [],
    "preds": []
  })
  const [counterfactuals, setCounterfactuals] = useState({
    "dps": [],
    "classes": [],
    "orig_classes": []
  })
  const [activeTab, setActiveTab] = useState(1)
  const [forceplots, setForceplots] = useState(null)
  const [forceplotMulti, setForceplotMulti] = useState(null)
  const [history, setHistory] = useState({
    "timestamps": [],
    "preds": []
  })
  const [generalInfo, setGeneralInfo] = useState({
      "prediction": 1,
      "r_squared": 1
  })
  const [historyAverage, setHistoryAverage] = useState(1)
  const [histLookback, setHistLookback] = useState(60)
  const standardLookback = 4

  useEffect(() => {
    fetchScores(histLookback).then(response => {
      setTrustscores(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [histLookback])

  useEffect(() => {
    fetchAnchors().then(response => {
      setAnchors(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [])

  useEffect(() => {
    fetchCounterfactuals().then(response => {
      setCounterfactuals(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [])


  useEffect(() => {
    fetchFeaturelist().then(response => {
        setFeatures(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [])

  useEffect(() => {
    fetchCurrentDp(histLookback).then(response => {
        setCurrentDp(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [histLookback])


  useEffect(() => {
      fetchForceplot().then(response => {
          setForceplots(response);
      })
      .catch(error => {
          setForceplots(null)
      });
  }, [])

  useEffect(() => {
    fetchForceplotMulti().then(response => {
        setForceplotMulti(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [])

  useEffect(() => {
      fetchHistory(histLookback).then(response => {
          setHistory({
            "timestamps": response.timestamps,
            "preds": response.preds
          });
      })
      .catch(error => {
          console.log(error)
      });
  }, [histLookback])

  useEffect(() => {
    fetchHistoryAverage(histLookback).then(response => {
        setHistoryAverage(response.prediction);
    })
    .catch(error => {
        console.log(error)
    });
  }, [histLookback])

  useEffect(() => {
    fetchHistoryAverage(standardLookback).then(response => {
        setGeneralInfo(response);
    })
    .catch(error => {
        console.log(error)
    });
  }, [])

  const handleTabChange = (e, newValue) => {
      setActiveTab(newValue)
  }

  const chooser = () => {
    if (activeTab === 2){
      return <FeatureImportance forceplots={forceplots} forceplotMulti={forceplotMulti}/>
    } else if (activeTab === 1) {
      return <History history={history} setHistLookback={setHistLookback}
        histLookback={histLookback} historyAverage={historyAverage} currentFeatures={currentDp}
      />
    } else if (activeTab === 3) {
      return <Behaviour features={features}/>
    } else if (activeTab === 4) {
      return <Trustscores trustscores={trustscores} timestamps={history.timestamps}/>
    } else if (activeTab === 5) {
      return <ExaminationChoice currentDp={currentDp} anchors={anchors}/>
    } else return null;
  }

  if (!(history && generalInfo.prediction && forceplots && historyAverage)) {
      return <Typography>Lädt....</Typography>
  }

  return (
    <Box className="App">
      <Paper sx={{m: 2, p: 2, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography variant="h2">XAI Prototype</Typography>
        <Paper sx={{m: 2}}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Historie" value={1} />
            <Tab label="Feature-Relevanz" value={2} />
            <Tab label="Model-Verhalten" value={3}  />
            <Tab label="Scoring" value={4}  />
            <Tab label="Was-Wenn?" value={5}  />
          </Tabs>
        </Paper>
        {chooser()}
      </Paper>
    </Box>
  );
}

export default App;
