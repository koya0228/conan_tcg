import {
  Button,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { cardsDataJson } from "../App";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MyModal } from "./MyComponents";

function DeckCard({ imgPath, onModalOpen, setSelectImage, cardIndex, selectDeckList, setSelectDeckList }) {
  const [cardCnt, setCardCnt] = useState(0);
  
  return (
    <VStack gap="2px" mb="4px">
      <Image
        src={`./assets/image/card/${imgPath}`}
        onClick={() => {
          setSelectImage(imgPath);
          onModalOpen()
        }}
      />
      <HStack w="100%" paddingInline="8px" justifyContent="space-between">
        <IconButton
          icon={<MinusIcon />}
          onClick={() => {
            if (cardCnt > 0) {
              setCardCnt(cardCnt - 1);
              const deletedDeckList = selectDeckList;
              deletedDeckList.splice(selectDeckList.indexOf(Number(cardIndex)), 1);
              setSelectDeckList([...deletedDeckList]);
            }
          }}
        />
        <Text>
          {cardCnt}
        </Text>
        <IconButton
          icon={<AddIcon />}
          onClick={() => {
            if (cardCnt < 3) {
              setCardCnt(cardCnt + 1);
              setSelectDeckList([...selectDeckList, cardIndex].sort((a, b) => {
                return a - b
              }));
            }
          }}
        />
      </HStack>
    </VStack>
  )
}

function UniqueCard({ imgPath, onModalOpen, setSelectImage, selectCard, setSelectCard, cardIndex }) {
  return (
    <VStack gap="2px" mb="4px">
      <Image
        src={`./assets/image/card/${imgPath}`}
        onClick={() => {
          setSelectImage(imgPath);
          onModalOpen()
        }}
      />
      <Button
          w="100%"
          h="auto"
          paddingBlock="0.2rem"
          color={cardIndex === selectCard ? ( "white1" ) : ( "black1" )}
          bgColor={cardIndex === selectCard ? ( "main" ) : ( "transparent" )}
          variant={cardIndex === selectCard ? ( null ) : ( "outline" )}
          onClick={() => {
            setSelectCard(cardIndex)
          }}
        >
          {cardIndex === selectCard ? (
              <Text>IS SELECTED</Text>
          ) : (
              <Text>SELECT</Text>
          )}
        </Button>
    </VStack>
  )
}

function CardsContainer(props) {
  return (
    <>
      <SimpleGrid
        w="100%"
        h="100%"
        minChildWidth={props.minW ? (props.minW) : ("140px")}
        spacing="8px"
        overflowY="scroll"
      >
        {props.children}
      </SimpleGrid>
    </>
  );
}

function DeckCardSelector({ selectDeckList, setSelectDeckList }) {
  const [selectImage, setSelectImage] = useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cardsData = useContext(cardsDataJson);

  return (
    <CardsContainer setSelectDeckList={setSelectDeckList} >
      {cardsData.map((e, i) => (
        e.type === "character" || e.type === "event" ? (
          <DeckCard
            imgPath={e.img}
            onModalOpen={onOpen}
            setSelectImage={setSelectImage}
            cardIndex={i}
            selectDeckList={selectDeckList}
            setSelectDeckList={setSelectDeckList}
            key={i}
          />
        ) : (
          null
        )
      ))}
      <MyModal isOpen={isOpen} onClose={onClose}>
        <Image src={`./assets/image/card/${selectImage}`} />
      </MyModal>
    </CardsContainer>
  );
}

function UniqueCardSelector({ cardType, selectPertner, setSelectPertner, selectCase, setSelectCase }) {
  const [selectImage, setSelectImage] = useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cardsData = useContext(cardsDataJson);

  return (
    <CardsContainer minW={cardType === "case" ? ("160px") : (null)}>
      {cardsData.map((e, i) => (
        e.type === cardType ? (
          cardType === "pertner" ? (
            <UniqueCard
              imgPath={e.img}
              onModalOpen={onOpen}
              selectCard={selectPertner}
              setSelectCard={setSelectPertner}
              setSelectImage={setSelectImage}
              key={i}
              cardIndex={i}
            />
          ) : (
            <UniqueCard
              imgPath={e.img}
              onModalOpen={onOpen}
              selectCard={selectCase}
              setSelectCard={setSelectCase}
              setSelectImage={setSelectImage}
              key={i}
              cardIndex={i}
            />
          )
        ) : (
          null
        )
      ))}
      <MyModal isOpen={isOpen} onClose={onClose}>
        <Image src={`./assets/image/card/${selectImage}`} />
      </MyModal>
    </CardsContainer>
  );
}

export { CardsContainer, DeckCard, DeckCardSelector, UniqueCardSelector };
