import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient}: PatientDetailsProps) {
    return (
        <div className="mx-5 my-10 px-5 py-10 shadow-md rounded-xl space-y-3 bg-white">
            <PatientDetailItem 
                label='ID'
                data={patient.id}
            />
            <PatientDetailItem 
                label='Nombre'
                data={patient.name}
            />
            <PatientDetailItem 
                label='Propietario'
                data={patient.caretaker}
            />
            <PatientDetailItem 
                label='Email'
                data={patient.email}
            />
            <PatientDetailItem 
                label='Fecha Alta'
                data={patient.date.toString()}
            />
            <PatientDetailItem 
                label='Síntomas'
                data={patient.symptoms}
            />
            <div className="flex">
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
        </div>
    )
}
