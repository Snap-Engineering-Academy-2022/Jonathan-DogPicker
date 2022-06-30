import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TraitCard(props) {
  let isClicked = false;
  console.log("props", props)
  return (
    <Button 
          href="#" 
          variant="outlined" 
          sx={{ my: 1, mx: 1.5 }}x
          onClick={() => {
            // selected.push(props);
            isClicked = true;

          }}
    >
        {props}
    </Button>
  );
}