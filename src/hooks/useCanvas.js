import { useEffect, useRef } from "react";

export default function useCanvas(callback) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        callback([canvas, ctx]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return canvasRef;
}
