import React from "react";
import AddIcon from '@mui/icons-material/Add'

import Button from '@mui/material/Button';

export const AddButton: React.FC = () => {
    return (
        <Button variant="contained">
            <AddIcon fontSize="large"/>
        </Button>
    )
}