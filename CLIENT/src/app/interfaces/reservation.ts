export interface Reservation {
    id: string,
    classId: string,
    fname: string,
    email: string,
    phone: string,
    age: number,
    gender: 'm' | 'f',
}

export const enum ConfirmationStatus {
    CONFIRMED = 'confirmed',
    UNSURE = 'unconfirmed',
    PENDING = 'pending'
}

export const enum ReservationStatus {
    SHOW = 'show',
    NOSHOW = 'noshow',
    PENDING = 'pending',
    ORGANIZERCANCELLED = 'organizercancelled'
}