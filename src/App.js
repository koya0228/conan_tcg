import { createContext, useState } from 'react';
import { Grid, GridItem, Stack } from '@chakra-ui/react';
import "destyle.css";
import "./style.css";

import CardSelectorContainer from './components/CardSelectorContainer';
import SelectedViewerContainer from './components/SelectedViewerContainer';

import data from "./data.json";
import Header from './components/Header';
export const cardsDataJson = createContext(data);

function App() {
  const [selectPertner, setSelectPertner] = useState();
  const [selectCase, setSelectCase] = useState();
  const [selectDeckList, setSelectDeckList] = useState([]);
  const [deckName, setDeckName] = useState("")

  return (
    <Grid
      className="App"
      w="100vw"
      h="100vh"
      gridTemplateRows="56px minmax(0, 1fr)"
    >
      <GridItem bg="main">
        <Header
          selectPertner={selectPertner}
          setSelectPertner={setSelectPertner}
          selectCase={selectCase}
          setSelectCase={setSelectCase}
          selectDeckList={selectDeckList}
          setSelectDeckList={setSelectDeckList}
          deckName={deckName}
        />
      </GridItem>
      <GridItem p="0.5rem 1.2rem 1rem">
        <Stack h="100%" flexDir="row">
          <CardSelectorContainer
            selectPertner={selectPertner}
            setSelectPertner={setSelectPertner}
            selectCase={selectCase}
            setSelectCase={setSelectCase}
            selectDeckList={selectDeckList}
            setSelectDeckList={setSelectDeckList}
            setDeckName={setDeckName}
          />
          <SelectedViewerContainer
            selectPertner={selectPertner}
            selectCase={selectCase}
            selectDeckList={selectDeckList}
            setSelectDeckList={setSelectDeckList}
          />
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default App;
