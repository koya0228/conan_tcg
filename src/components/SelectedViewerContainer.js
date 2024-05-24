import { VStack } from "@chakra-ui/react";
import PTCSViewer from "./PTCSViewer";
import DeckViewer from "./DeckViewer";

export default function SelectedViewerContainer({ selectPertner, selectCase, selectDeckList, setSelectDeckList }) {
  return (
    <VStack w="100%" h="100%">
      <PTCSViewer
        selectPertner={selectPertner}
        selectCase={selectCase}
      />
      <DeckViewer
        selectDeckList={selectDeckList}
        setSelectDeckList={setSelectDeckList}
      />
    </VStack>
  )
}
