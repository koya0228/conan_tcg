import { Box, Input } from "@chakra-ui/react";
import CardSelector from "./CardSelectorTabs";
import DeckImage from "./CardFormat";
import { useContext } from "react";
import { cardsDataJson } from "../App";

export default function CardSelectorContainer({
  selectPertner,
  setSelectPertner,
  selectCase,
  setSelectCase,
  selectDeckList,
  setSelectDeckList,
  setDeckName
}) {
  return (
    <Box w="100%" h="100%" pr="8px" borderRight="2px gray solid">
      <CardSelector
        selectPertner={selectPertner}
        setSelectPertner={setSelectPertner}
        selectCase={selectCase}
        setSelectCase={setSelectCase}
        selectDeckList={selectDeckList}
        setSelectDeckList={setSelectDeckList}
        setDeckName={setDeckName}
      />
    </Box>
  );
}
