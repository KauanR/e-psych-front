export interface Attendance {
    id: number
    related: AttendancePatient | AttendanceProfessional
    status: 'active' | 'inactive' | 'pending' | 'rejected'
    createdAt: string
    updatedAt: string
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