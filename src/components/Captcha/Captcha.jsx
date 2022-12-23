import { useState, useEffect } from "react";

import useCanvas from "../../hooks/useCanvas";
import sprite from "../../images/sprite.svg";
import "./Captcha.css";

export default function Captcha(setState) {
    const [inputCaptcha, setInputCaptcha] = useState("");
    const [ctx, setCtx] = useState();
    const [text, setText] = useState();

    useEffect(() => {
        triggerFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx]);

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function textGenerator() {
        let generatedText = "";
        for (let i = 0; i < 3; i++) {
            generatedText += String.fromCharCode(randomNumber(65, 90));
            generatedText += String.fromCharCode(randomNumber(97, 122));
            generatedText += String.fromCharCode(randomNumber(48, 57));
        }
        return generatedText;
    }

    function triggerFunction() {
        setInputCaptcha("");
        let text = textGenerator();
        text = [...text].sort(() => Math.random() - 0.5).join("");
        setText(text);
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
            const letterSpace = 150 / text.length;
            for (let i = 0; i < text.length; i++) {
                const xInitialSpace = 25;
                ctx.font = "20px Roboto Mono";
                ctx.fillStyle = textColors[randomNumber(0, 1)];
                ctx.fillText(text[i], xInitialSpace + i * letterSpace, randomNumber(25, 40), 100);
            }
        }
    }

    const canvasRef = useCanvas(([_canvas, ctx]) => {
        setCtx(ctx);
        triggerFunction();
    });

    function submitCaptcha(e) {
        e.preventDefault();
        if (inputCaptcha === text) {
            alert("Success");
            setState((prevState) => ({
                ...prevState,
                captcha: true,
            }));
        } else {
            alert("Incorrect");
            triggerFunction();
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <canvas id="canvas" ref={canvasRef} width="200" height="50"></canvas>
                <button id="reload-button" onClick={triggerFunction}>
                    <svg width="25" height="25">
                        <use href={sprite + "#rotate-right"}></use>
                    </svg>
                </button>
            </div>
            <input
                type="text"
                id="user-input"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
                placeholder="Enter the text in the image*"
            />
            <button id="submit-button" onClick={submitCaptcha}>
                Submit
            </button>
        </div>
    );
}
