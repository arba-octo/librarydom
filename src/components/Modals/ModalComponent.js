import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import { closeModal, selectModal } from "../../../../dev/library/library-dom/src/features/modal-slice";

function ModalComponent({ width, children }) {
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
    const dispatch = useDispatch();
    const modalOpen = useSelector(selectModal);
    const handleCloseModal = () => { dispatch(closeModal()); }

    return (
        <Modal
            open={modalOpen}
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