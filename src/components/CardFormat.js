import { Application, Container, Graphics, Matrix, Text, Texture, Sprite } from 'pixi.js';
import { useEffect, useState } from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import bgImage from "../deckImage/bgImage_gray.png";
import frameImage from "../deckImage/frameImage.png";
import deckSpaceImage from "../deckImage/deckSpaceImage.png";
import logoImage from "../deckImage/logo.png";


export default function DeckImage({cardJson, pertnerIndex, caseIndex, deckIndexes, deckName}) {
  const [dataURL, setDataURL] = useState()
  const [canvas, setCanvas] = useState();
  const [tmpNum, setTmpNum] = useState(0)
  const [deckNameIndex, setDeckNameIndex] = useState(-1);
  const [themeColor, setThemeColor] = useState(0x0E62A7);
  const [removeDeckStage, setRemoveDeckStage] = useState({fn: null})
  const [removeGraphStage, setRemoveGraphStage] = useState({})
  const [colorGraphicBg, setCplorGraphicBg] = useState({bg: null});
  const [colorGraphicText, setCplorGraphicText] = useState({});
  const [colorNumContainer, setColorNumContainer] = useState({fn: null})
  const [typeNumContainer, setTypeNumContainer] = useState({fn: null})

  const {isOpen, onOpen, onClose} = useDisclosure();

  async function loadImage(src) {
    const image = new Image();
    image.src = src;
    await image.decode();
    return image;
  };
  function resizeImg(imgData, w, h) {
    const _canvas = document.createElement('canvas');
    _canvas.width = w;
    _canvas.height = h;
    const ctx = _canvas.getContext('2d');
    ctx.drawImage(imgData, 0, 0, w, h);
    return _canvas.toDataURL('image/png')
  }

  useEffect(() => {
    const root = document.createElement("div");
    root.setAttribute("id", "app")

    const canvasApp = new Application({
      width: 1920,
      height: 1280,
      preserveDrawingBuffer: true,
      antialias: false,
      autoDensity: true,
      transparent: true,
    });
    
    root.appendChild(canvasApp.view);

    const bgImgTexture = Texture.from(bgImage);
    const bgImgSprite = new Sprite(bgImgTexture);
    bgImgSprite.anchor.x = 0.5;
    bgImgSprite.anchor.y = 0.5;
    bgImgSprite.x = canvasApp.screen.width / 2;
    bgImgSprite.y = canvasApp.screen.height / 2;
    bgImgSprite.tint = themeColor
    setCplorGraphicBg({
      bg: (cvap) => {
        const rrr = cvap.stage.children.indexOf(bgImgSprite)
        return rrr
      }
    })
    canvasApp.stage.addChild(bgImgSprite);

    const frameImgTexture = Texture.from(frameImage);
    const frameImgSprite = new Sprite(frameImgTexture);
    frameImgSprite.anchor.x = 0.5;
    frameImgSprite.anchor.y = 0.5;
    frameImgSprite.x = canvasApp.screen.width / 2;
    frameImgSprite.y = canvasApp.screen.height / 2;
    canvasApp.stage.addChild(frameImgSprite);

    const graphics = new Graphics()
      .beginFill(0xffffff)
      .drawRoundedRect(87, 87, 1746, 1106, 40)
      .endFill();
    canvasApp.stage.addChild(graphics);

    const deckSpaceImgTexture = Texture.from(deckSpaceImage);
    const dexkSpaceImgSprite = new Sprite(deckSpaceImgTexture);
    dexkSpaceImgSprite.x = 509;
    dexkSpaceImgSprite.y = 425;
    canvasApp.stage.addChild(dexkSpaceImgSprite);

    const logoImgTexture = Texture.from(logoImage);
    const logoImgSprite = new Sprite(logoImgTexture);
    logoImgSprite.width = 291.95;
    logoImgSprite.height = 64
    logoImgSprite.x = 1509;
    logoImgSprite.y = 119;
    canvasApp.stage.addChild(logoImgSprite);

    const topLine = new Graphics()
      .lineStyle(2, 0x000000)
      .moveTo(119, 182)
      .lineTo(1481, 182)
    canvasApp.stage.addChild(topLine);

    const colorCountSpace = new Container()
    colorCountSpace.width = 370;
    const colorList = ["青：", "緑：", "白：", "赤：", "黄：", "黒："]
    for(let i = 0; i < 6; i++) {
      const colorText = new Text(colorList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0x000000, align : 'left', fontWeight: 'bolder'});
      colorText.anchor.y = 0.5;
      colorText.x = Math.floor(i / 3) * 185
      colorText.y = (i % 3 * 32)
      colorCountSpace.addChild(colorText)
    }
    colorCountSpace.pivot.set(0)
    colorCountSpace.x = 119
    colorCountSpace.y = 807
    canvasApp.stage.addChild(colorCountSpace)

    const eventCountSpace = new Container()
    eventCountSpace.width = 370;
    const eventList = ["パートナー：", "事件：", "キャラクター：", "イベント："]
    for(let i = 0; i < 4; i++) {
      const colorText = new Text(eventList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0x000000, align : 'left', fontWeight: 'bolder'});
      colorText.anchor.y = 0.5;
      colorText.y = i * 32
      eventCountSpace.addChild(colorText)
    }
    eventCountSpace.pivot.set(0)
    eventCountSpace.x = 119
    eventCountSpace.y = 987
    canvasApp.stage.addChild(eventCountSpace)

    function addGraphFrame(h, labelList) {
      const graphColor = 0x9a9a9a
      const graphFrame = new Graphics()
        .lineStyle(2, graphColor)
        .moveTo(120, h)
        .lineTo(488, h)
        .lineTo(488, h + 178)
        .lineTo(120, h + 178)
        .lineTo(120, h - 1)
      canvasApp.stage.addChild(graphFrame);
      for(let i = 1; i < 9; i++) {
        const startX = 120 + 46 * i;
        const graphSpliter = new Graphics()
          .lineStyle(2, graphColor)
          .moveTo(startX, h)
          .lineTo(startX, h + 178)
        canvasApp.stage.addChild(graphSpliter)
      }
      const graphFooter = new Graphics()
        .lineStyle(36, graphColor)
        .moveTo(120, h + 161)
        .lineTo(488, h + 161)
      canvasApp.stage.addChild(graphFooter);
      for(let i = 0; i < 8; i++) {
        const labelText = new Text(labelList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'center', fontWeight: 'bolder'});
        labelText.anchor.set(0.5)
        labelText.x = 143 + 46 * i;
        labelText.y = h + 161
        canvasApp.stage.addChild(labelText)
      }
    }

    addGraphFrame(257, [1, 2, 3, 4, 5, 6, 7, 8])
    addGraphFrame(527, ["C", "CP", "R", "RP", "SR", "SRP", "D", "PR"])

    function addHeadText(x, y, w, h, _text) {
      const headContainer = new Container();
      const shapeGraphic = new Graphics()
        .beginFill(0xffffff)
        .drawRoundedRect(0, 0, w, h, 6)   
        .endFill();
      headContainer.addChild(shapeGraphic);
      const bgGraphic = new Graphics()
        .beginTextureFill({
          texture: bgImgTexture,
          color: 0xffffff,
          alpha: 1,
          matrix: new Matrix(0.5, 0, 0, 0.5, -500, -500),
        })
        .drawRoundedRect(0, 0, w, h, 6)
        .endFill();
      bgGraphic.tint = themeColor;
      headContainer.addChild(bgGraphic);
      const text = new Text(_text, {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center', fontWeight: 'bold'});
      text.anchor.set(0.5);
      text.x = headContainer.width / 2;
      text.y = headContainer.height / 2;
      headContainer.addChild(text);
      headContainer.x = x;
      headContainer.y = y;
      canvasApp.stage.addChild(headContainer)

      const colGraphicHeading = colorGraphicText
      colGraphicHeading[`${x}${y}`] = (cvap) => {
        const rrr = cvap.stage.children.indexOf(headContainer)
        const ddd = headContainer.children.indexOf(bgGraphic)
        return [rrr, ddd]
      }
      setCplorGraphicText(colGraphicHeading)
    }

    addHeadText(119, 119, 200, 40, "デッキ名")
    addHeadText(119, 206, 200, 40, "レベル")
    addHeadText(119, 476, 200, 40, "レアリティ")
    addHeadText(119, 746, 200, 40, "カードの色")
    addHeadText(119, 925, 200, 40, "カードの種類")

    addHeadText(519, 206, 200, 40, "パートナー")
    addHeadText(739, 206, 236, 40, "事件")
    // addHeadText(1035, 206, 200, 40, "能力 / 効果")

    setCanvas(canvasApp);
    setTmpNum(tmpNum + 1);
  }, []);

  function imageToDataURL(){
    const canvasApp = canvas;
    setDataURL(canvasApp.renderer.view.toDataURL());
  }

  useEffect(() => {
    async function ptCardSet() {
      if(canvas) {
        const ptImgPath = `./assets/image/card/${cardJson[pertnerIndex].img}`
        const ptImgData = resizeImg(await loadImage(ptImgPath), 120, 167.01)
        const canvasApp = canvas;
        const ptImgTexture = Texture.from(ptImgData);
        const ptImgSprite = new Sprite(ptImgTexture);
        ptImgSprite.x = 559;
        ptImgSprite.y = 256;
        canvasApp.stage.addChild(ptImgSprite)
        setCanvas(canvasApp);
        setTmpNum(tmpNum + 1)
      }
    }
    ptCardSet()
  }, [pertnerIndex])

  useEffect(() => {
    async function csCardSet() {
      if(canvas) {
        const csImgPath = `./assets/image/card/${cardJson[caseIndex].img}`
        const csImgData = resizeImg(await loadImage(csImgPath), 232.32, 167.01)
        const canvasApp = canvas;
        const csImgTexture = Texture.from(csImgData);
        const csImgSprite = new Sprite(csImgTexture);
        csImgSprite.x = 741;
        csImgSprite.y = 256;
        canvasApp.stage.addChild(csImgSprite)
        setCanvas(canvasApp);
        setTmpNum(tmpNum + 1)
      }
    }
    csCardSet()
  }, [caseIndex])

  useEffect(() => {
    if(canvas) {
      const canvasApp = canvas;
      if (typeNumContainer.fn != null) {
        typeNumContainer.fn(canvasApp)
      }
      const typeCounter = {"pertner": 0, "case": 0, "character": 0, "event": 0}
      for(let i = 0; i < deckIndexes.length; i++) {
        const cardType = cardJson[deckIndexes[i]].type;
        typeCounter[cardType] += 1;
      }
      if(pertnerIndex >= 0) {
        typeCounter.pertner = 1
      }
      if(caseIndex >= 0) {
        typeCounter.case = 1
      }
      const eventCountSpace = new Container()
      const eventList = Object.values(typeCounter)
      for(let i = 0; i < 4; i++) {
        const colorText = new Text(eventList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0x000000, align : 'left', fontWeight: 'bolder'});
        colorText.anchor.y = 0.5;
        colorText.y = i * 32
        eventCountSpace.addChild(colorText)
      }
      eventCountSpace.pivot.set(0)
      eventCountSpace.x = 300
      eventCountSpace.y = 987
      setTypeNumContainer({
        fn: (cvap) => {
          const cntNumIndex = cvap.stage.children.indexOf(eventCountSpace);
          cvap.stage.children.splice(cntNumIndex, 1)
        }
      })
      canvasApp.stage.addChild(eventCountSpace)
      setCanvas(canvasApp);
      setTmpNum(tmpNum + 1)
    }
  }, [pertnerIndex, caseIndex])
  
  function addGraph(counterObject, h){
    const counterList = Object.values(counterObject)
    const maxNum = Math.max(...counterList);

    const canvasApp = canvas
    if (Object.keys(removeGraphStage).indexOf(`${h}`) >= 0) {
      removeGraphStage[h](canvasApp)
    }

    const graphContainer = new Container();
    graphContainer.width = 1920;
    graphContainer.height = 1280;
    for(let i = 0; i < counterList.length; i++) {
      const barHeight = counterList[i] * 112 / maxNum;
      const graphBar = new Graphics()
        .beginFill(0x9a9a9a)
        .drawRect(143 + 46 * i, h + 140, 32, barHeight, 6)   
        .endFill();
      graphBar.pivot.x = 16
      graphBar.pivot.y = barHeight
      graphContainer.addChild(graphBar)
      const barNum = new Text(counterList[i], {fontFamily : 'Arial', fontSize: 18, fill : 0x9a9a9a, align : 'center'});
      barNum.anchor.x = 0.5
      barNum.anchor.y = 1
      barNum.x = 143 + 46 * i
      barNum.y = h + 140 - barHeight
      graphContainer.addChild(barNum)
    }
    canvasApp.stage.addChild(graphContainer)
    setCanvas(canvasApp);
    const rmGraph = removeGraphStage
    rmGraph[h] = (cvap) => {
      const rrr = cvap.stage.children.indexOf(graphContainer)
      cvap.stage.children.splice(rrr, 1)
    }
    setRemoveGraphStage(rmGraph)
    setTmpNum(tmpNum + 1);
  }

  useEffect(() => {
    if(canvas) {
      const canvasApp = canvas;

      if (removeDeckStage.fn !== null) {
        removeDeckStage.fn(canvasApp)
      }

      const deckSpaceContainer = new Container();
      deckIndexes.map(async (cardIndex, i) => {
        const cardImgPath = `./assets/image/card/${cardJson[cardIndex].img}`;
        const cardImgData = resizeImg(await loadImage(cardImgPath), 126, 175.36)
        const cardImgTexture = Texture.from(cardImgData);
        const cardImgSprite = new Sprite(cardImgTexture);
        cardImgSprite.x = (i % 10) * 126;
        cardImgSprite.y = Math.floor(i / 10) * 179.36;
        deckSpaceContainer.addChild(cardImgSprite)
      })
      deckSpaceContainer.x = 531;
      deckSpaceContainer.y = 442;
      canvasApp.stage.addChild(deckSpaceContainer)
      setRemoveDeckStage({fn: ((cvap) => {
        const rrr = cvap.stage.children.indexOf(deckSpaceContainer)
        cvap.stage.children.splice(rrr, 1)
      })})
      setCanvas(canvasApp);
      setTmpNum(tmpNum + 1);

      const levelCounter = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0}
      for(let i = 0; i < deckIndexes.length; i++) {
        const cardLevel = cardJson[deckIndexes[i]].level;
        levelCounter[cardLevel] += 1;
      }
      const rarityCounter = {"C": 0, "CP": 0, "R": 0, "RP": 0, "SR": 0, "SRP": 0, "D": 0, "PR": 0}
      for(let i = 0; i < deckIndexes.length; i++) {
        const cardRare = cardJson[deckIndexes[i]].rarity;
        rarityCounter[cardRare] += 1;
      }
      addGraph(levelCounter, 257)
      addGraph(rarityCounter, 527)

      const colorCounter = {"blue": 0, "green": 0, "white": 0, "red": 0, "yellow": 0, "black": 0}
      for(let i = 0; i < deckIndexes.length; i++) {
        const cardColor = cardJson[deckIndexes[i]].color;
        colorCounter[cardColor] += 1;
      }
      const mostColor = Object.keys(colorCounter)[Object.values(colorCounter).indexOf(Math.max(...Object.values(colorCounter)))];
      switch (mostColor) {
        case "blue": setThemeColor(0x0E62A7); break;
        case "green": setThemeColor(0x00ff00); break;
        case "white": setThemeColor(0xffffff); break;
        case "red": setThemeColor(0xff0000); break;
        case "yellow": setThemeColor(0xE2A11C); break;
        case "black": setThemeColor(0x999999); break;
        default: break;
      }

      if (colorNumContainer.fn != null) {
        colorNumContainer.fn(canvasApp)
      }
      const colorNumList = Object.values(colorCounter)
      const colorCountSpace = new Container();
      for(let i = 0; i < 6; i++) {
        const colorText = new Text(colorNumList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0x000000, align : 'left', fontWeight: 'bolder'});
        colorText.anchor.y = 0.5;
        colorText.x = Math.floor(i / 3) * 185
        colorText.y = (i % 3 * 32)
        colorCountSpace.addChild(colorText)
      }
      colorCountSpace.pivot.set(0)
      colorCountSpace.x = 195
      colorCountSpace.y = 807
      setColorNumContainer({
        fn: (cvap) => {
          const cntNumIndex = cvap.stage.children.indexOf(colorCountSpace);
          cvap.stage.children.splice(cntNumIndex, 1)
        }
      })
      canvasApp.stage.addChild(colorCountSpace)

      if (typeNumContainer.fn != null) {
        typeNumContainer.fn(canvasApp)
      }
      const typeCounter = {"pertner": 0, "case": 0, "character": 0, "event": 0}
      for(let i = 0; i < deckIndexes.length; i++) {
        const cardType = cardJson[deckIndexes[i]].type;
        typeCounter[cardType] += 1;
      }
      if(pertnerIndex >= 0) {
        typeCounter.pertner = 1
      }
      if(caseIndex >= 0) {
        typeCounter.case = 1
      }
      const eventCountSpace = new Container()
      const eventList = Object.values(typeCounter)
      for(let i = 0; i < 4; i++) {
        const colorText = new Text(eventList[i], {fontFamily : 'Arial', fontSize: 20, fill : 0x000000, align : 'left', fontWeight: 'bolder'});
        colorText.anchor.y = 0.5;
        colorText.y = i * 32
        eventCountSpace.addChild(colorText)
      }
      eventCountSpace.pivot.set(0)
      eventCountSpace.x = 300
      eventCountSpace.y = 987
      setTypeNumContainer({
        fn: (cvap) => {
          const cntNumIndex = cvap.stage.children.indexOf(eventCountSpace);
          cvap.stage.children.splice(cntNumIndex, 1)
        }
      })
      canvasApp.stage.addChild(eventCountSpace)

      setCanvas(canvasApp);
      setTmpNum(tmpNum + 1)
    }
  }, [deckIndexes])

  useEffect(() => {
    if (canvas) {
      const canvasApp = canvas;

      if (deckNameIndex >= 0) {
        canvasApp.stage.children.splice(deckNameIndex, 1)
      }

      const text = new Text(deckName, {fontFamily : 'Arial', fontSize: 36, fill : 0x000000, align : 'left'});
      text.anchor.y = 0.5
      text.x = 343;
      text.y = 137;
      canvasApp.stage.addChild(text);
      setCanvas(canvasApp);
      setDeckNameIndex(canvasApp.stage.children.length - 1)
      setTmpNum(tmpNum + 1)
    }
  }, [deckName])

  useEffect(() => {
    if(canvas) {
      const canvasApp = canvas;
      if(colorGraphicBg.bg !== null) {
        const gIndex = colorGraphicBg.bg(canvasApp)
        canvasApp.stage.children[gIndex].tint = themeColor;
      }

      const textGraphics = Object.keys(colorGraphicText);
      for(let i = 0; i < textGraphics.length; i++) {
        const [rrr, ddd] = colorGraphicText[textGraphics[i]](canvasApp)
        canvasApp.stage.children[rrr].children[ddd].tint = themeColor;
      }
      setCanvas(canvasApp);
    }
  }, [themeColor])

  useEffect(() => {
    if (tmpNum > 1) {
      imageToDataURL()
    }
  }, [tmpNum]);

  return (
    <>
      <Button color="white1" onClick={()=> { imageToDataURL(); onOpen() }}>PREVIEW</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="80vw" >
          <ModalBody >
            <img alt='preview' src={dataURL} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
