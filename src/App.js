import { Box, Paper, Typography, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect, createContext, useMemo } from "react";
import "./App.css";
import Behaviour from "./Behaviour";
import ExaminationChoice from "./components/LocalExamination/ExaminationChoice";
import FeatureImportance from "./FeatureImportance";
import { fetchAnchors } from "./fetching/anchors";
import { fetchCounterfactuals } from "./fetching/counterfactuals";
import {
  fetchForceplot,
  fetchForceplotMulti,
} from "./fetching/feature_importance";
import { fetchCurrentDp, fetchFeaturelist } from "./fetching/general";
import { fetchHistory, fetchHistoryAverage } from "./fetching/history";
import { fetchScores } from "./fetching/scoring";
import History from "./History";
import Trustscores from "./Trustscores";
import useClickTracker from "./customHooks/useClickTracker";
import CopyToClipboardText from "./CopyToClipboardText";
import {v4 as uuidv4} from 'uuid';

export const globalClickContext = createContext(null);

function App() {

  let user;

  if (localStorage.getItem("user")) {
    user = localStorage.getItem("user")
  } else {
    user = uuidv4()
    localStorage.setItem("user", user);
  }
  const {clicks, handleClickTracker} = useClickTracker([], user);

  const [features, setFeatures] = useState([]);
  const [currentDp, setCurrentDp] = useState([]);
  const [trustscores, setTrustscores] = useState({
    predicted_classes: [],
    closest_classes: [],
    scores: [],
  });
  const [anchors, setAnchors] = useState({
    anchors: [],
    precisions: [],
    coverages: [],
    dps: [],
    preds: [],
  });
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") ? parseInt(localStorage.getItem("activeTab")) : 1);
  const [forceplots, setForceplots] = useState(null);
  const [forceplotMulti, setForceplotMulti] = useState(null);
  const [history, setHistory] = useState({
    timestamps: [],
    preds: [],
  });
  const [generalInfo, setGeneralInfo] = useState({
    prediction: 1,
    r_squared: 1,
  });
  const [historyAverage, setHistoryAverage] = useState(1);
  const [histLookback, setHistLookback] = useState(60);
  const standardLookback = 4;

  useEffect(() => {
      localStorage.setItem("activeTab", activeTab)
  }, [activeTab])

  useEffect(() => {
    fetchScores(histLookback)
      .then((response) => {
        setTrustscores(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [histLookback]);

  useEffect(() => {
    fetchAnchors()
      .then((response) => {
        setAnchors(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchFeaturelist()
      .then((response) => {
        setFeatures(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchCurrentDp(histLookback)
      .then((response) => {
        setCurrentDp(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [histLookback]);

  useEffect(() => {
    fetchForceplot()
      .then((response) => {
        setForceplots(response);
      })
      .catch((error) => {
        setForceplots(null);
      });
  }, []);

  useEffect(() => {
    fetchForceplotMulti()
      .then((response) => {
        setForceplotMulti(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchHistory(histLookback)
      .then((response) => {
        setHistory({
          timestamps: response.timestamps,
          preds: response.preds,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [histLookback]);

  useEffect(() => {
    fetchHistoryAverage(histLookback)
      .then((response) => {
        setHistoryAverage(response.prediction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [histLookback]);

  useEffect(() => {
    fetchHistoryAverage(standardLookback)
      .then((response) => {
        setGeneralInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const chooser = () => {
    if (activeTab === 2) {
      return (
        <FeatureImportance
          forceplots={forceplots}
          forceplotMulti={forceplotMulti}
        />
      );
    } else if (activeTab === 1) {
      return (
        <History
          history={history}
          setHistLookback={setHistLookback}
          histLookback={histLookback}
          historyAverage={historyAverage}
          currentFeatures={currentDp}
        />
      );
    } else if (activeTab === 3) {
      return <Behaviour features={features} />;
    } else if (activeTab === 4) {
      return (
        <Trustscores
          trustscores={trustscores}
          timestamps={history.timestamps}
        />
      );
    } else if (activeTab === 5) {
      return <ExaminationChoice currentDp={currentDp} anchors={anchors}/>;
    } else return null;
  };

  if (!(history && generalInfo.prediction && historyAverage)) {
    return <Typography>Lädt....</Typography>;
  }

  return (
    <Box className="App">
      <globalClickContext.Provider value={{clicks, handleClickTracker}}>
        <Paper
          sx={{
            m: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            position: "relative" 
          }}
        >
          <CopyToClipboardText text={user}/>
          <Typography variant="h1">XAI Prototype</Typography>
          <Paper sx={{ m: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="History" value={1} />
              <Tab label="Feature Relevance" value={2} disabled />
              <Tab label="Model behaviour" value={3} disabled />
              <Tab label="Scoring" value={4} disabled />
              <Tab label="What-if?" value={5} />
            </Tabs>
          </Paper>
          {chooser()}
        </Paper>
      </globalClickContext.Provider>
    </Box>
  );
}

export default App;
