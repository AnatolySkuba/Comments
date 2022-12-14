import { useState, useEffect, FocusEventHandler } from "react";
import { toast } from "react-toastify";
import { FormikTouched, FormikErrors } from "formik";

import useCanvas from "../hooks/useCanvas";
import sprite from "../../images/sprite.svg";
import "./Captcha.css";

type Props = {
    formik: {
        initialValues: {
            userName: string;
            email: string;
            homePage: string;
            text: string;
            captcha: string;
        };
        values: any;
        touched: FormikTouched<{ [captcha: string]: any }>;
        errors: FormikErrors<{ [captcha: string]: string[] }>;
        handleBlur: FocusEventHandler<HTMLInputElement> | undefined;
    };
    captcha: {
        inputCaptcha: string;
        isCaptcha: boolean;
    };
    setCaptcha: React.Dispatch<
        React.SetStateAction<{
            inputCaptcha: string;
            isCaptcha: boolean;
        }>
    >;
};

export default function Captcha({ formik, captcha, setCaptcha }: Props): JSX.Element {
    const [ctx, setCtx] = useState<any>();
    const [text, setText] = useState("");
    const [showRequired, setShowRequired] = useState(false);

    useEffect(() => {
        triggerFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx]);

    function randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        formik.touched.captcha &&
            setTimeout(() => {
                setShowRequired(true);
            }, 100);
    }, [formik.touched.captcha]);

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
        setCaptcha((prevState) => ({
            ...prevState,
            inputCaptcha: "",
        }));
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

    const canvasRef = useCanvas(([_canvas, ctx]: any) => {
        setCtx(ctx);
        triggerFunction();
    });

    function submitCaptcha(e: { preventDefault: () => void }) {
        e.preventDefault();
        if (captcha.inputCaptcha === text) {
            toast.success("Success");
            formik.values.captcha = text;
            setCaptcha((prevState) => ({
                ...prevState,
                isCaptcha: true,
            }));
        } else {
            toast.error("Incorrect");
            triggerFunction();
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <canvas id="canvas" ref={canvasRef} width="200" height="50"></canvas>
                <button id="reload-button" onClick={triggerFunction} type="button">
                    <svg width="25" height="25">
                        <use href={sprite + "#rotate-right"}></use>
                    </svg>
                </button>
            </div>
            <input
                type="text"
                id="captcha"
                name="captcha"
                value={captcha.inputCaptcha}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                    setCaptcha((prevState) => ({
                        ...prevState,
                        inputCaptcha: e.target.value,
                    }))
                }
                placeholder="Enter the text in the image*"
            />
            {showRequired && !captcha.isCaptcha ? <p>{formik.errors.captcha}</p> : null}
            <button type="button" id="submit-button" onClick={submitCaptcha}>
                Submit
            </button>
        </div>
    );
}
