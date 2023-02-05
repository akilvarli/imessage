import 'next-auth';
import 'react';

declare module 'react'

declare module 'next-auth' {

    interface Session {
        user: User
    }

    interface User {
        id: string;
        username: string;
        image: string;
    }
}