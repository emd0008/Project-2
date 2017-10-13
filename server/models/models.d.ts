declare namespace models{
    interface ICreateResponse{
        id: number;
    }
    interface ICategory{
        id: number;
        name: string;
    }
    interface IPost{
        id: number;
        categoryid: number;
        userid: number;
        title: string;
        content: string;
        createdAt: Date;

        userFirstName?: string;
        userLastName?: string;
        categoryName?: string;
    }
    interface IUser{
        id: number;
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        role: string;
    }
}