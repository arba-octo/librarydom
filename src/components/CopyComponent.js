import {useState} from "react";

function CopyComponent({ data }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // через 1.5 сек убираем уведомление
        } catch (err) {
            alert('Ошибка копирования');
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="favourite__modal_button-text"
        >
            {copied ? 'скопировано!' : 'скопируйте'}
        </button>
    );
};
export default CopyComponent;