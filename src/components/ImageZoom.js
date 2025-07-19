import React, { useRef, useState } from "react";
import Image from "next/image";

const magnifierSize = 150; // Размер окна увеличения
const zoom = 2;

export default function ImageMagnifier({ src, alt, width, height }) {
    const imgRef = useRef(null);
    const [show, setShow] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });

    function handleMouseMove(e) {
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Ограничение координат внутри изображения
        const xClamped = Math.max(0, Math.min(x, rect.width));
        const yClamped = Math.max(0, Math.min(y, rect.height));

        // Позиция background внутри лупы
        const bgX = -xClamped * zoom + magnifierSize / 2;
        const bgY = -yClamped * zoom + magnifierSize / 2;

        setZoomPos({
            x: xClamped - magnifierSize / 2,
            y: yClamped - magnifierSize / 2,
            bgX,
            bgY,
        });
    }

    return (
        <div
            style={{ display: "inline-block", position: "relative" }}
        >
            <Image
                src={src}
                alt={alt}
                ref={imgRef}
                width={width}
                height={height}
                style={{ display: "block", maxWidth: "100%" }}
                onMouseEnter={() => setShow(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShow(false)}
            />
            {show && (
                <div
                    style={{
                        position: "absolute",
                        left: zoomPos.x,
                        top: zoomPos.y,
                        width: magnifierSize,
                        height: magnifierSize,
                        border: "2px solid #333",
                        borderRadius: "8px",
                        background: `url(${src}) no-repeat`,
                        backgroundSize: `${(imgRef.current?.width || 0) * zoom}px ${(imgRef.current?.height || 0) * zoom}px`,
                        backgroundPosition: `${zoomPos.bgX}px ${zoomPos.bgY}px`,
                        pointerEvents: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 100,
                    }}
                />
            )}
        </div>
    );
}