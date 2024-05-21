import { Grid, GridItem, Stack } from '@chakra-ui/react';
import CardSelectorContainer from './components/CardSelectorContainer';
import SelectedViewerContainer from './components/SelectedViewerContainer';
import "destyle.css";

function App() {
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
