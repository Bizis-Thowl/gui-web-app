
import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Paper, Select, Typography } from "@mui/material";
import { fetchAle, fetchAle2d } from './fetching/behaviour';

export default function Behaviour(props) {

    const [activeFeature, setActiveFeature] = useState(props.features[0])
    const [active2dFeatures, setActive2dFeatures] = useState([props.features[0], props.features[1]])
    const [ale, setAle] = useState(null)
    const [ale2d, setAle2d] = useState(null)

    const handleChange = (event) => {
        setActiveFeature(event.target.value)
    }

    const handle2dChange = (event, index) => {
        const state_copy = [...active2dFeatures]
        state_copy[index] = event.target.value
        setActive2dFeatures(state_copy)
    }

    useEffect(() => {
        fetchAle(activeFeature).then(response => {
            setAle(response);
        })
        .catch(error => {
            console.log(error)
        });
    }, [activeFeature])

    useEffect(() => {
        fetchAle2d(active2dFeatures[0], active2dFeatures[1]).then(response => {
            setAle2d(response);
        })
        .catch(error => {
            console.log(error)
        });
    }, [active2dFeatures])

    const renderMenuItems = () => {
        const items = []

        for (const feature of props.features) {
            items.push(<MenuItem value={feature}>{feature}</MenuItem>)
        }

        return items
    }

    return(
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1200 }}>  
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3">
                    ALE Plot
                </Typography>
                <Select sx={{width: 400}}
                    value={activeFeature}
                    onChange={handleChange}
                    >
                    {renderMenuItems()}
                </Select>
                <Paper sx={{p: 2, m: 2}}>
                    <iframe srcDoc={ale} width={800} height={520}/>
                </Paper>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3">
                    ALE Plot 2D
                </Typography>
                <Select sx={{width: 400}}
                    value={active2dFeatures[0]}
                    onChange={(e) => handle2dChange(e, 0)}
                    >
                    {renderMenuItems()}
                </Select>
                <Select sx={{width: 400}}
                    value={active2dFeatures[1]}
                    onChange={(e) => handle2dChange(e, 1)}
                    >
                    {renderMenuItems()}
                </Select>
                <Paper sx={{p: 2, m: 2}}>
                    <iframe srcDoc={ale2d} width={800} height={520}/>
                </Paper>
            </Box>
        </Box>
    )
}