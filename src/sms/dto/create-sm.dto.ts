export class CreateSmDto {
    name: string;
    surname: string;
    company: string;
    phone: string;
    group: string;
}

export class CreateSmsDto {
    mobile_number?: string;
    mobile_numbers?: string;
    message: string;
}

