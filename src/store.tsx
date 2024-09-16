import { create } from 'zustand';
import { Patient, PatientDraft } from './types';
import { v4 as uuidv4 } from 'uuid';

type PatientState = {
    patients: Patient[]
    addPatient: (data: PatientDraft) => void;
}

const createNewPatient = (patient: PatientDraft): Patient => {
    return {
        ...patient, 
        id: uuidv4()
    }
}

export const usePatientStore = create<PatientState>(set => ({
    patients: [],
    addPatient: (data: PatientDraft) => {
        const newPatient = createNewPatient(data);

        set( state => ({
            patients: [...state.patients, newPatient]
        }))
    }
}));

