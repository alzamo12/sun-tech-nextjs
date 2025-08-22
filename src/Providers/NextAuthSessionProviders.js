"use client";
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const NextAuthSessionProviders = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthSessionProviders;