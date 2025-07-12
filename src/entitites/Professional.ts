export interface Professional {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    birth: string;
    registration: string;
    cpf: string;
    area: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProfessionalLow {
    id: string
    firstName: string
    lastName: string
    registration: string
}