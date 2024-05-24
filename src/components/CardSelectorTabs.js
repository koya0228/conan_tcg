import { TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { MyTab, MyTabPanel } from "./MyComponents";
import { DeckCardSelector, UniqueCardSelector } from "./CardSelector";

export default function CardSelector({ selectPertner, setSelectPertner, selectCase, setSelectCase, selectDeckList, setSelectDeckList }) {
  return (
    <Tabs h="100%" display="flex" flexDir="column" variant="unstyled">
      <TabList pb="0.6rem">
        <MyTab>PERTNER</MyTab>
        <MyTab>CASE</MyTab>
        <MyTab>CHARACTER / EVENT</MyTab>
      </TabList>
      <TabPanels overflow="auto">
        <MyTabPanel>
          <UniqueCardSelector
            cardType="pertner"
            selectPertner={selectPertner}
            setSelectPertner={setSelectPertner}
            selectCase={selectCase}
            setSelectCase={setSelectCase}
          />
        </MyTabPanel>
        <MyTabPanel>
          <UniqueCardSelector
            cardType="case"
            selectPertner={selectPertner}
            setSelectPertner={setSelectPertner}
            selectCase={selectCase}
            setSelectCase={setSelectCase}
          />
        </MyTabPanel>
        <MyTabPanel>
          <DeckCardSelector
            selectDeckList={selectDeckList}
            setSelectDeckList={setSelectDeckList}
          />
        </MyTabPanel>
      </TabPanels>
    </Tabs>
  );
}
