import { Box, Modal } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, selectModal} from "@/features/modal-slice";

function ModalComponent({ width, children }) {
    const dispatch = useDispatch();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
    };
    const modal = useSelector(selectModal);
    const handleCloseModal = () => { dispatch(closeModal()); };

    return (
        <Modal
            open={modal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
};
export default ModalComponent;