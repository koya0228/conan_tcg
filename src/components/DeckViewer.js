import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { CardsContainer } from "./CardSelector";
import { MyModal } from "./MyComponents";
import { useContext, useState } from "react";
import { cardsDataJson } from "../App";

export default function DeckViewer({ selectDeckList, setSelectDeckList }) {
  const [selectImage, setSelectImage] = useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cardsData = useContext(cardsDataJson);

  const textStyle = {
    width: "100%",
    fontWeight: "bold",
    borderRadius: "4px",
    textAlign: "center"
  }

  return (
    <>
      <Text style={textStyle} bg="main" color="white1">DECK</Text>
      <Box w="100%" overflow="auto">
        <CardsContainer>
          {selectDeckList.map((e, i) => (
            cardsData[e].type === "character" || cardsData[e].type === "event" ? (
              <Image src={`./assets/image/card/${cardsData[e].img}`} />
            ) : (
              null
            )
          ))}
          <MyModal isOpen={isOpen} onClose={onClose}>
            <Image src={`./assets/image/card/${selectImage}`} />
          </MyModal>
        </CardsContainer>
      </Box>
    </>
  )
}
