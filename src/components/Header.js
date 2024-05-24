import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton, Spacer, Text, useColorMode } from "@chakra-ui/react";
import DeckImage from "./CardFormat";
import { useContext } from "react";
import { cardsDataJson } from "../App";

export default function Header({
  selectPertner,
  setSelectPertner,
  selectCase,
  setSelectCase,
  selectDeckList,
  setSelectDeckList
}) {
  const cardsData = useContext(cardsDataJson);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack className="header" h="100%" paddingInline="6px">
      <Box>
        <Text color="white1">CONAN TCG DECK MAKER</Text>
      </Box>
      <Spacer />
      <HStack>
        {/* <IconButton
          icon={colorMode === "light" ? (
            <SunIcon />
          ) : (
            <MoonIcon />
          )}
          onClick={toggleColorMode}
        /> */}
        <DeckImage
          cardJson={cardsData}
          pertnerIndex={selectPertner}
          caseIndex={selectCase}
          deckIndexes={selectDeckList}
          deckName=""
        />
        {/* <Button
          color="white1"
          bg="none"
        >
          DOWNLOAD
        </Button> */}
      </HStack>
    </HStack>
  )
}
