export interface User {
    id: string
    type: 'patient' | 'professional'
    attributes: {
        name: string
        email: string
        photoUrl: string
        phoneNumber: string
        address: string
        addressNumber: string
        zipCode: string
        registerNumber?: string
        costLevel?: number
        observations?: string
    }
}