import PatientForm from "./components/PatientForm";
import PatientsList from "./components/PatientsList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <div className="container mx-auto mt-14">
                <h1 className="text-4xl md:text-5xl font-black text-center md:w-2/3 md:mx-auto">
                    Seguimiento de Pacientes {''}
                    <span className="text-indigo-700">
                        Veterinaria
                    </span>
                </h1>

                <div className="mt-12 md:flex">
                    <PatientForm />
                    <PatientsList />
                </div>
            </div>
            
            <ToastContainer />
        </>
    );
}

export default App;
