import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Captcha from "../Captcha";
import "./Form.css";

const TAGS = ["i", "strong", "code", "a"];

export default function Form() {
    const [captcha, setCaptcha] = useState({ inputCaptcha: "", isCaptcha: false });

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            homePage: "",
            text: "",
            captcha: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .matches(/^[a-zA-Z0-9]+$/, "Letters and numbers only")
                .required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            homePage: Yup.string().matches(/^((http|https|ftp):\/\/).+/, "URL format"),
            text: Yup.string()
                .matches(
                    /^([^<]*|((<code>.*<\/code>)*|(<i>[^<]*<\/i>)*|(<strong>[^<]*<\/strong>)*|([^<]*(<a href="[^"]*" title="[^"]*">[^<]*<\/a>)*)*)*)$/,
                    "You can only use the following HTML tags:  <a href=”” title=””> </a> <code> </code> <i> </i> <strong> </strong>"
                )
                .required("Required"),
            captcha: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            console.log(36, values);
            if (captcha.isCaptcha) {
                console.log(38, values);
                formik.resetForm();
                setCaptcha({ inputCaptcha: "", isCaptcha: false });
                console.log(40, values);
            }
        },
    });

    function addTag(e) {
        const tag = e.target.outerText.slice(1, -1);
        formik.setFieldValue(
            "text",
            formik.values.text +
                (tag === "a" ? `<${tag} href="" title=""></${tag}>` : `<${tag}></${tag}>`)
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="tags">
                {TAGS.map((tag, index) => (
                    <button key={index} type="button" onClick={addTag} className="tag">
                        [{tag}]
                    </button>
                ))}
            </div>
            <label>
                Text*
                <textarea
                    type="text"
                    name="text"
                    rows="5"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.text && formik.errors.text ? <p>{formik.errors.text}</p> : null}
            </label>
            <div className="wrapper">
                <div>
                    <label>
                        User Name*
                        <input
                            type="text"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <p>{formik.errors.userName}</p>
                        ) : null}
                    </label>
                    <label>
                        E-mail*
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p>{formik.errors.email}</p>
                        ) : null}
                    </label>
                    <label>
                        Home page
                        <input
                            type="text"
                            name="homePage"
                            value={formik.values.homePage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.homePage && formik.errors.homePage ? (
                            <p>{formik.errors.homePage}</p>
                        ) : null}
                    </label>
                </div>
                <div>
                    <Captcha formik={formik} captcha={captcha} setCaptcha={setCaptcha} />
                </div>
            </div>
            <button type="submit">Add comment</button>
        </form>
    );
}
