export type Patient = {
    id: string;
    name: string;
    caretaker: string;
    email: string;
    date: Value;
    symptoms: string;
}

export type PatientDraft = Omit<Patient, 'id'>;

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];