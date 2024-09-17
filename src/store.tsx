import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Patient, PatientDraft } from './types';
import { v4 as uuidv4 } from 'uuid';

type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: PatientDraft) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: PatientDraft) => void
}

const createNewPatient = (patient: PatientDraft): Patient => {
    return {
        ...patient, 
        id: uuidv4()
    }
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            set => ({
                patients: [],
                activeId: '',
                addPatient: (data) => {
                    const newPatient = createNewPatient(data);

                    set(state => ({
                        patients: [...state.patients, newPatient]
                    }))
                },
                deletePatient: (id) => {
                    set(state => ({
                        patients: state.patients.filter(patient => patient.id !== id)
                    }))
                },
                getPatientById: (id) => {
                    set(() => ({
                        activeId: id
                    }))
                },
                updatePatient: (data) => {
                    set(state => ({
                        patients: state.patients.map(patient => patient.id === state.activeId ? {...data, id: state.activeId} : patient),
                        activeId: ''
                    }))
                }
            }), {
                name: 'patient-storage'
            }
        )
    )
)