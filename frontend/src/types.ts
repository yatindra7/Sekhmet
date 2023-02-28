export interface User {
    id: number;
    name: string;
    role: 'Doctor' | 'Admin' | 'Front Desk Operator' | 'Data Entry Operator';
}

export interface LoginForm {
    email: string;
    password: string;
}