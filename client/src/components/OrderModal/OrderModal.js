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
        </Modal>
        )
};
export default OrderModal;