import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BookCard from "@/components/Books/BookCard";

// Стили для модального окна
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 600,
    bgcolor: '#EFEDED',
    borderRadius: '35px',
    p: 4,
};

function Book({book}) {
    //console.log('book (приходит в Book) = ', book);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="book">
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: '30px',
                        cursor: 'pointer',
                        bgcolor: '#F5F5F5',
                        borderRadius: '18px',
                        p: '0 5px 5px 5px'
                        }}
                     onClick={handleOpen}
                >
                    { book.faceImg && <img className="book__preview" src={book.faceImg} alt="Книга"/> }
                    <Box sx={{fontSize: '18px', color: '#020202', textAlign: 'center'}}>{book.title}</Box>
                    <Box sx={{fontSize: '16px', color: '#787878', textAlign: 'center'}}>{book.author}</Box>
                    <Box sx={{fontSize: '16px', color: '#787878', textAlign: 'center', mt: '5px'}}>{book.pages} стр.</Box>
                </Box>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <BookCard
                        id={book.id}
                        book={book}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default Book;