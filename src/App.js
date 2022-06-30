import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './App.css';
import CharacterCard from './CharacterCard.js';
import TraitCard from './TraitCard.js';
import React, { useState, useEffect } from 'react';


function App() {
  const [dogData, setDogData] = useState([]);
  const [dogTemperaments, setDogTemperaments] = useState([]);
  const [traits, setTraits] = useState([]);
  const [selected, setSelected] = useState([])
  const [bestDogIndex, setBestDogIndex] = useState(10)
  function newFetch() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=50", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log("2 inside fetch", Date.now());
                  console.log("3 special dogs", result, "---", Date.now())
                  
                  setDogData(result)
                  setDogTemperaments(result)

                })
                .catch(error => console.log('error', error));
            
              console.log("4 after fetch", dogTemperaments, "---", Date.now());
  }

  useEffect(() => {newFetch()}, [])

  useEffect(() => {
    createTraits();
  }, [dogTemperaments])

  function createTraits(){
    var currentTraits = new Set([]);
    for(let i = 0; i < dogTemperaments.length; i++) {
      let newArr = []
      if ('temperament' in dogTemperaments[i].breeds[0]) {
        if (dogTemperaments[i].breeds[0].temperament.includes(',') === true) {
          newArr = dogTemperaments[i].breeds[0].temperament.split(', ')
        }
        else {
          newArr = dogTemperaments[i].breeds[0].temperament
        }
      }
      currentTraits = new Set([...traits, ...newArr]);
    }
    setTraits(Array.from(currentTraits));
  
    console.log("<++++++++DogTemps++++>", dogTemperaments)
  }

 
  console.log("<++++++++Traits++++>", traits, selected)
 

  function returnDog(selected) {
    let DogIndex = 0;
    let bestDogNum = 0;
    for(let i = 0; i < dogData.length;i++) {   
      let newArr = dogData[i].breeds[0].temperament.split(', ');
      let numIntersection = selected.filter(element => newArr.includes(element));
      if(numIntersection >= bestDogNum) {
        DogIndex = i;
        bestDogNum = numIntersection
      }
    }

    return DogIndex;
  }

  return (
    <div className="App" style = {{backgroundColor: "#BBF1F1"}}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid lightgray' }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HumanToDog
          </Typography>
          <Button 
            href="#" 
            variant="outlined" 
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              console.log("1 before fetch in App()", dogData, "---", Date.now());
              newFetch()
            }}
          >
            AGAIN!
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4}}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2}}
        >
          What dog are you? hehe
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary"
          sx={{ mx: 10 }}
        >
          Select the personality traits that best represent you to see what dog breed you are!
        </Typography>
      </Container>
      <Container maxWidth="md" sx={{ my: 4}}>
        <Grid container 
          spacing={0.5} 
          justifyContent="center"
          alignItems="flex-start"
        >
          {
          traits && traits.map((trait) =>
            <Grid
              item
              xs={6}
              md={4}
            >
            {/* <TraitCard/> */}
            <Button 
              href="#" 
              variant="outlined" 
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => {
                setSelected([...selected, trait])
              }}
            >
              {trait}
            </Button>
          </Grid>
          )}
        </Grid>
    </Container>
    
       
      <Container maxWidth="md" sx={{ my: 4}}>
        <Button 
          href="#" 
          variant="outlined" 
          sx={{ my: 1, mx: 1.5 }}
          onClick={() => {
            setBestDogIndex(returnDog(selected))
            console.log("<++++++++BEST DOG INDEX++++>", bestDogIndex)
          }}
        >
          SUBMIT
        </Button>
      </Container> 


      <Container maxWidth="md" sx={{ my: 4}}>

        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2}}
        >
          THE TYPE OF DOG YOU ARE IS:
        </Typography>
          <Grid
            item
            xs={12}
            md={4}
          >
            {console.log("The best dog: ",dogTemperaments[bestDogIndex])}
          {dogTemperaments.length > 0 && <CharacterCard
              name = {dogData[bestDogIndex].breeds[0].name}
              image = {dogData[bestDogIndex].url}
              description = {[ 
                "Traits: " + dogData[bestDogIndex].breeds[0].temperament, 
                "Bred for: " + dogData[bestDogIndex].breeds[0].bred_for,
              ]}
              
          />}
          </Grid>
      </Container>
      <Container maxWidth="md" sx={{ my: 4}}>
        <Typography
          variant="h3"
          align="center"
          color="text.primary"
          sx={{ py: 2}}
        >
          Other Dogs(for eye candy, enjoy):
        </Typography>
        {/* <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary"
          sx={{ mx: 10 }}
        >
          Select the personality traits that best represent you to see what dog breed you are!
        </Typography> */}
      </Container>
 
      <Container maxWidth="lg">
        <Grid container 
          spacing={5} 
          justifyContent="center"
          alignItems="flex-start"
        >
          {dogData.length>0 && dogData.map((dog) =>
            <Grid
              item
              xs={12}
              md={4}
            >
            <CharacterCard
                name = {dog.breeds[0].name}
                image = {dog.url}
                description = {[dog.breeds[0].temperament]}
                
            />
          </Grid>
          )}
        </Grid>
      </Container>
     
    </div>
  );
}

export default App;
