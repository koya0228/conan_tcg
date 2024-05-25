import { Box, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { cardsDataJson } from "../App";

import pertnerImage from "../deckImage/PT_CR_EV_card.jpg";
import caseImage from "../deckImage/CS_card.jpg";

export default function PTCSViewer({ selectPertner, selectCase }) {
  const cardsData = useContext(cardsDataJson);

  useEffect(() => {
    
  }, [selectPertner])

  const textStyle = {
    width: "100%",
    fontWeight: "bold",
    borderRadius: "4px",
    textAlign: "center",
    marginBottom: "2px"
  }

  return (
    <HStack w="100%" justifyContent="start" alignItems="start">
      <Box w="10vw">
        <Text style={textStyle} bg="main" color="white1">PERTNER</Text>
        {selectPertner >= 0 ? (
          <Image src={`./assets/image/card/${cardsData[Number(selectPertner)].img}`} />
        ) : (
          <Skeleton>
            <Image src={pertnerImage} />
          </Skeleton>
        )}
      </Box>
      <Box w="calc(14vw * 1000 / 716)">
        <Text style={textStyle} bg="main" color="white1">CASE</Text>
        {selectCase ? (
          <Image src={`./assets/image/card/${cardsData[selectCase].img}`} />
        ) : (
          <Skeleton>
            <Image src={caseImage} />
          </Skeleton>
        )}
      </Box>
    </HStack>
  )
}
