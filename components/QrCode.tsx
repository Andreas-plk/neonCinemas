'use client'
import { QRCodeCanvas } from "qrcode.react";

const QrCode = ({id}:{id:string}) => {
    return (
        <div className="flex flex-col items-center pt-4">
            <QRCodeCanvas
                value={JSON.stringify({ id })}
                size={150}
                level="H"
            />
        </div>
    )
}
export default QrCode
