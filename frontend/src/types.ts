export interface User {
    id: number;
    name: string;
    role: 'Doctor' | 'Admin' | 'Front Desk Operator' | 'Data Entry Operator';
}