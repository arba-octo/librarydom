import {Typography} from "@mui/material";
import CopyComponent from "../CopyComponent";
import {Link} from "react-router-dom";

function ModalToTelegramAllBook ({ dataBook }) {
    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Внимание!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Чтобы взять все книги на чтение,
                {' '}
                <CopyComponent data={dataBook} />
                {' '}
                их данные и вставьте (ctrl + V) в телеграмм-канал
                {' '}
                <Link
                    to="https://t.me/+WA1jwbcj6xlhMzli"
                    target="_blank"
                    rel="noopener noreferrer"
                ><button className="favourite__modal_button-text">БиблиоDom</button></Link>
            </Typography>
        </>
    )
};
export default ModalToTelegramAllBook;