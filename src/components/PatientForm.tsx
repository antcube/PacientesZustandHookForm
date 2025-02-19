import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Error from "./Error";
import { PatientDraft, Value } from "../types";
import { usePatientStore } from "../store";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function PatientForm() {
    const addPatient = usePatientStore( state => state.addPatient);
    const activeId = usePatientStore( state => state.activeId);
    const patients = usePatientStore( state => state.patients);
    const updatePatient = usePatientStore( state => state.updatePatient);

    const { register, handleSubmit, control, reset, formState: { errors }, setValue } = useForm<PatientDraft>();

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter(patient => patient.id === activeId)[0];
            setValue('name', activePatient.name);
            setValue('caretaker', activePatient.caretaker);
            setValue('email', activePatient.email);
            setValue('date', activePatient.date);
            setValue('symptoms', activePatient.symptoms);

            // const activePatient = patients.find(patient => patient.id === activeId);
            // if(activePatient) {
            //     setValue("name", activePatient.name);
            //     setValue("caretaker", activePatient.caretaker);
            //     setValue("email", activePatient.email);
            //     setValue("date", activePatient.date.toString());
            //     setValue("symptoms", activePatient.symptoms);
            // }
        }
    }, [activeId])

    const registerPatient: SubmitHandler<PatientDraft> = data => {
        const trimmedData = {
            ...data,
            name: data.name.trim(),
            caretaker: data.caretaker.trim(),
            email: data.email.trim(),
            symptoms: data.symptoms.trim()
        }

        if(activeId) {
            updatePatient(trimmedData)
            toast.success('Paciente actualizado correctamente', {
                autoClose: 2000,
                theme: 'colored'
            })
        } else {
            addPatient(trimmedData);
            toast.success('Paciente añadido correctamente', {
                autoClose: 2000,
                theme: 'colored'
            })
        }
        reset();
    }

    const tomorrow = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    }, []);

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-5 md:mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-14 md:mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="text-sm uppercase font-bold"
                    >
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio',
                            minLength: {
                                value: 3,
                                message: 'El nombre debe tener al menos 3 caracteres',
                            }
                        })}
                    />
                    {errors.name && (
                        <Error>
                            {errors.name.message}
                        </Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="caretaker"
                        className="text-sm uppercase font-bold"
                    >
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El nombre del propietario es obligatorio',
                            minLength: {
                                value: 4,
                                message: 'El nombre debe tener al menos 4 caracteres',
                            }
                        })}
                    />
                    {errors.caretaker && (
                        <Error>
                            {errors.caretaker.message}
                        </Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-sm uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register('email', {
                            required: 'El email del propietario es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email no válido",
                            }

                        })}
                    />
                    {errors.email && (
                        <Error>
                            {errors.email.message}
                        </Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="date"
                        className="text-sm uppercase font-bold"
                    >
                        Fecha Alta
                    </label>
                    {/* <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'La fecha de alta es obligatoria'
                        })}
                    /> */}
                    <Controller 
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                id="date"
                                className="w-full p-3  border border-gray-100"
                                value={field.value}
                                onChange={(date: Value) => {
                                    field.onChange(date);
                                }}
                                minDate={tomorrow}
                            />
                        )}
                        rules={{required: 'La fecha de alta es obligatoria'}}
                    />
                    {errors.date && (
                        <Error>
                            {errors.date.message}
                        </Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="symptoms"
                        className="text-sm uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'Los síntomas del paciente son obligatorios',
                            minLength: {
                                value: 10,
                                message: 'Los síntomas deben tener al menos 10 caracteres',
                            }
                        })}
                    ></textarea>
                    {errors.symptoms && (
                        <Error>
                            {errors.symptoms.message}
                        </Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={activeId ? 'Actualizar Paciente' : 'Guardar Paciente'}
                />
            </form>
        </div>
    );
}