import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { toast } from "react-toastify"
import { format } from "date-fns"

type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({patient}: PatientDetailsProps) {
    const deletePatient = usePatientStore(state => state.deletePatient);
    const getPatientById = usePatientStore(state => state.getPatientById);

    const handleClickDelete = () => {
        deletePatient(patient.id)
        toast.error('Paciente Eliminado', {
            autoClose: 2000,
            theme: 'colored'
        })
    }

    const formatDate: string = Array.isArray(patient.date) 
        ? patient.date.map(d => d ? format(d, 'dd/MM/yyyy') : 'Sin fecha').join(' - ') 
        : patient.date ? format(patient.date, 'dd/MM/yyyy') : 'Sin fecha';
        
    return (
        <div className="mx-5 mb-10 px-5 py-10 shadow-md rounded-xl bg-white">
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
                data={formatDate}
            />
            <PatientDetailItem 
                label='Síntomas'
                data={patient.symptoms}
            />
            <div className="flex flex-col gap-3 lg:flex-row justify-between mt-5">
                <button
                    type='button'
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg text-sm md:text-base"
                    onClick={() => getPatientById(patient.id)}
                >   
                    <div className="flex items-center justify-center gap-2">
                        Editar
                        <PencilSquareIcon className="h-4 w-4 md:h-6 md:w-6 text-white"/>
                    </div>
                </button>
                <button
                    type='button'
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg text-sm"
                    onClick={() => handleClickDelete()}
                >   
                    <div className="flex items-center justify-center gap-2">
                        Eliminar
                        <TrashIcon className="h-4 w-4 md:h-6 md:w-6 text-white"/>
                    </div>
                </button>
            </div>
        </div>
    )
}
