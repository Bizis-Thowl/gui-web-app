import { Visibility, Close, VisibilityOff, LockRounded } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import React from 'react';

export default function MyToggleButton(props) {

    const {onClick, selected, locked, text} = props

    return(
        <ToggleButton sx={{display: "flex", justifyContent: "space-between"}} onClick={onClick} selected={selected}>
            {text}
            {
                selected ?
                <Visibility/> :
                <VisibilityOff/>
            }
            {
                locked &&
                <LockRounded/>
            }
        </ToggleButton>
    )
}