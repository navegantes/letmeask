import copyImg from "../assets/images/copy.svg";
import { toast } from "react-toastify";
import React from "react";

import "../styles/room-code.scss";
import "react-toastify/dist/ReactToastify.css";

type RoomCodeProps = {
    code: string;
};

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
};

export function RoomCode(props: RoomCodeProps) {
    const notify = (msg: string, options: object) => {
        toast.success(msg, options);
    };

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);

        notify("Codigo da sala copiado para área de transferência.", options);
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            {/* <ToastContainer /> */}
            <span>Sala #{props.code}</span>
        </button>
    );
}
