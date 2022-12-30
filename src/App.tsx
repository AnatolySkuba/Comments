import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "./components/Form";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Form />
            </header>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggablePercent={60}
                pauseOnHover
                limit={3}
            />
        </div>
    );
}

export default App;
