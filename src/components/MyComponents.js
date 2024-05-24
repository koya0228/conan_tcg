import { Modal, ModalBody, ModalContent, ModalOverlay, Tab, TabPanel } from "@chakra-ui/react";

function MyTab(props) {
  return (
    <Tab
      style={{
        marginRight: "4px",
        border: "2px solid #408a62",
        borderRadius: '4px',
      }}
      _selected={{
        color: '#f7faf8',
        bg: '#408a62',
      }}
    >
      {props.children}
    </Tab>
  );
}

function MyTabPanel(props) {
  return (
    <TabPanel w="100%" h="100%" p="0">
      {props.children}
    </TabPanel>
  );
}

function MyModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {props.children}
          </ModalBody>
        </ModalContent>
    </Modal>
  );
}

export { MyTab, MyTabPanel, MyModal };
