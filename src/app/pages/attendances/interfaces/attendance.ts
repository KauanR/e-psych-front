export interface Attendance {
    id: number
    status: 'active' | 'inactive' | 'pending' | 'rejected'
    patient: AttendancePatient
    professional: AttendanceProfessional
}

export interface AttendancePatient extends AttendanceGenericUser {}

export interface AttendanceProfessional extends AttendanceGenericUser {
    registerNumber: string
    costLevel: number
    observations: string
}

interface AttendanceGenericUser {
    id: number
    name: string
    photoUrl: string
    phoneNumber: string
    address: string
    addressNumber: number
    zipCode: string
    createdAt: string
    updatedAt: string
}