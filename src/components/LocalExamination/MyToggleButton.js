import { Visibility, Close } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import React from 'react';

export default function MyToggleButton(props) {

    const {onClick, selected, text} = props

    return(
        <ToggleButton sx={{display: "flex", justifyContent: "space-between"}} onClick={onClick} selected={selected}>
            {text}
            {
                selected ?
                <Visibility/> :
                <Close/>
            }
        </ToggleButton>
    )
}