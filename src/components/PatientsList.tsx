import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails";

export default function PatientsList() {
    const patients = usePatientStore(state => state.patients);

    return (
        <div className="md:w-1/2 lg:w-3/5 h-screen overflow-y-scroll hide-scrollbar">
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">
                        Listado de Pacientes
                    </h2>

                    <p className="text-lg mt-5 text-center mb-5 md:mb-10">
                        Administra tus {""}
                        <span className="text-indigo-600 font-bold">pacientes y citas</span>
                    </p>

                    {patients.map( patient => (
                        <PatientDetails 
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        No hay Pacientes
                    </h2>

                    <p className="text-lg mt-5 text-center mb-5 md:mb-10">
                        Comience agregando pacientes {""}
                        <span className="text-indigo-600 font-bold">y se mostrará en este sección</span>
                    </p>
                </>
            )}
        </div>
    )
}
