module MessagingDemo.Models {
    export interface CustomerModel {
        id: number;
        fullName: string;
        phoneNumber: string;
    }

    export interface MessageModel {
        customers: number[],
        message: string
    }
}