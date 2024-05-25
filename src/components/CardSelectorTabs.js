import { Input, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { MyTab, MyTabPanel } from "./MyComponents";
import { DeckCardSelector, UniqueCardSelector } from "./CardSelector";

export default function CardSelector({ selectPertner, setSelectPertner, selectCase, setSelectCase, selectDeckList, setSelectDeckList, setDeckName }) {
  function deckNameChanged(e){
    setDeckName(e.target.value);
  }

  return (
    <Tabs h="100%" display="flex" flexDir="column" variant="unstyled">
      <Input placeholder="DECK NAME ..." minH="40px" mb="8px" border="2px" borderColor="main" onBlur={deckNameChanged}></Input>
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
      <Text textAlign="center">画像の著作権は©青山剛昌/小学館 ©TOMYに帰属します</Text>
    </Tabs>
  );
}
