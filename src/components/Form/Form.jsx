import { useState } from "react";

import Captcha from "../Captcha";
import "./Form.css";

const initialState = {
    userName: "",
    email: "",
    homePage: "",
    text: "",
    captcha: false,
};

export default function Form() {
    const [state, setState] = useState(initialState);

    function handleSubmit(e) {
        e.preventDefault();

        setState(initialState);
    }

    function handleChange(e) {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Text*
                <textarea
                    onInput={handleChange}
                    type="text"
                    name="text"
                    rows="5"
                    value={state.text}
                    onChange={handleChange}
                    pattern='[^<]*|(([^<]*(<code>.*<\/code>)*)*|([^<]*(<i>[^<]*<\/i>)*)*|([^<]*(<strong>[^<]*<\/strong>)*)*|([^<]*(<a href="[^"]*" title="[^"]*">[^<]*<\/a>)*)*)*'
                    title="You can only use the following HTML tags:  <a href=”” title=””> </a> <code> </code> <i> </i> <strong> </strong>"
                    required
                />
            </label>
            <div className="wrapper">
                <div>
                    <label>
                        User Name*
                        <input
                            onInput={handleChange}
                            type="text"
                            name="userName"
                            value={state.userName}
                            onChange={handleChange}
                            pattern="^[a-zA-Z0-9]+$"
                            title="Letters or numbers only"
                            required
                        />
                    </label>
                    <label>
                        E-mail*
                        <input
                            onInput={handleChange}
                            type="text"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            pattern=".+@.+\..+"
                            required
                        />
                    </label>
                    <label>
                        Home page
                        <input
                            onInput={handleChange}
                            type="text"
                            name="homePage"
                            value={state.homePage}
                            onChange={handleChange}
                            pattern="^((http|https|ftp):\/\/).+"
                            title="URL format"
                        />
                    </label>
                </div>
                <Captcha setState={setState} />
            </div>
            <button type="submit">Add comment</button>
        </form>
    );
}
