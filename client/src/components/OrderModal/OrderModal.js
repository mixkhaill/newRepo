import {Modal} from "antd";

const OrderModal = ({session, orderedBy, showModal, setShowModal}) => {

    const table = ['Krzysztof', 'Anna', 'Bartosz', 'Dawid', 'Aleksandra'];
    const tab = table[Math.floor(Math.random()* table.length)];
    return (
        <Modal 
        visible={showModal} 
        title="info" 
        onCancel={()=> setShowModal(!showModal)}>
            <p>Status: {session.payment_status ? "opłacony" : "nieopłacony"}</p>
            <p>Łączna kwota: {session.currency.toUpperCase()}{" "}{session.amount_total / 100}</p>
            <p>Sprzedawca: {orderedBy.name}</p>
            <p>Imię zwierzęcia: Filemon</p>
            <p>rodzaj: kot</p>
            <p>Opiekun: {tab}</p>
            <p>posilek 1: godzina: 8, karma mokra</p>
            <p>posilek 2: godzina: 12, karma mokra</p>
            <p>posilek 3: godzina: 16, karma mokra</p>
            <p>posilek 4: godzina: 20, karma mokra</p>
            <p>badania lekarskie: nie</p>
        </Modal>
        )
};
export default OrderModal;