import {Modal} from "antd";

const KeeperModal = ({session, orderedBy, showModal2, setShowModal2}) => {

    const table = ['Krzysztof', 'Anna', 'Bartosz', 'Dawid', 'Aleksandra'];
    const tab = table[Math.floor(Math.random()* table.length)];
    return (
        <Modal 
        visible={showModal2} 
        title="Informacje o opiekunie" 
        onCancel={()=> setShowModal2(!showModal2)}>
        <p>imie: {tab}</p>
        <p>podopieczni: brak</p>
        </Modal>
        )
};
export default KeeperModal;