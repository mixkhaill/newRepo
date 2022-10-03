import {Modal} from "antd";

const AddKeeper = ({session, orderedBy, showModal, setShowModal}) => {

    const table = ['Krzysztof', 'Anna', 'Bartosz', 'Dawid', 'Aleksandra'];
    const tab = table[Math.floor(Math.random()* table.length)];
    return (
        <Modal 
        visible={showModal} 
        title="Dodaj opiekuna" 
        onCancel={()=> setShowModal(!showModal)}>
             <input
                type="Text"
                name="title"
                placeholder="dodaj opiekuna"
                className="form-control m-2"
            />
            <button
                  className="btn btn-primary"
                >
                  dodaj
                </button>
        </Modal>
        )
};
export default AddKeeper;