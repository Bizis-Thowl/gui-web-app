import {Box, Paper, Typography, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';
import Behaviour from './Behaviour';
import FeatureImportance from './FeatureImportance';
import { fetchAle } from './fetching/behaviour';
import { fetchForceplot, fetchForceplotMulti } from './fetching/feature_importance';
import { fetchCurrentDp, fetchFeaturelist } from './fetching/general';
import { fetchHistory, fetchHistoryAverage } from './fetching/history';
import History from './History';
import GeneralLinePlot from './plots/GeneralLinePlot';

function App() {

  const [pred, setPred] = useState({
      value: 42,
      confidence: "76%"
  });

  const [features, setFeatures] = useState([])
  const [currentDp, setCurrentDp] = useState([])
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
  const [histLookback, setHistLookback] = useState(1)
  const standardLookback = 4

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
    } else return null;
  }

  if (!(history && generalInfo.prediction && forceplots && historyAverage)) {
      return <Typography>Lädt....</Typography>
  }

  return (
    <Box className="App">
      <Paper sx={{m: 2, p: 2, display: "flex", flexDirection: "column", alignItems: "center"}}>
      
        <Typography>Die geschätzte Zeit bist zum Ausfall ist: <b>{generalInfo.prediction.toFixed(2)}</b> Tage (max: 60 Tage)</Typography>
        <Box>
            <Typography>Der aktuelle R² Wert liegt bei: <b>{generalInfo.r_squared.toFixed(2)}</b></Typography>
            <Typography sx={{color: "red"}}>Ein R-Wert im negativen Bereich bedeutet, dass das Model <b>keine guten</b> Vorhersagen trifft.</Typography>

        </Box>
        <Paper sx={{m: 2}}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Historie" value={1} />
            <Tab label="Feature-Relevanz" value={2} />
            <Tab label="Model-Verhalten" value={3}  />
            <Tab label="Beispiele" value={4}  />
          </Tabs>
        </Paper>
        {chooser()}
      </Paper>
    </Box>
  );
}

export default App;
