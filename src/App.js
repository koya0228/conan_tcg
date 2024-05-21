import { useEffect, useState } from 'react';
import { Grid, GridItem, Stack } from '@chakra-ui/react';
import "destyle.css";

import CardSelectorContainer from './components/CardSelectorContainer';
import SelectedViewerContainer from './components/SelectedViewerContainer';

import data from "./data.json";

function App() {
  const [dataJson, setDataJson] = useState();

  useEffect(() => {
    setDataJson(data);
  }, [])

  return (
    <Grid
      className="App"
      w="100vw"
      h="100vh"
      gridTemplateRows="56px 1fr"
    >
      <GridItem>
        Header
      </GridItem>
      <GridItem>
        <Stack h="100%" flexDir="row">
          <CardSelectorContainer />
          <SelectedViewerContainer />
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default App;
