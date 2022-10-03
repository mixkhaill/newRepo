import {Modal} from "antd";

const OrderModal = ({session, orderedBy, showModal, setShowModal}) => {

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
            <p>posilek 1: </p>
            <p>posilek 2: </p>
            <p>posilek 3: </p>
            <p>posilek 4: </p>
            <p>badania lekarskie: </p>
        </Modal>
        )
};
export default OrderModal;