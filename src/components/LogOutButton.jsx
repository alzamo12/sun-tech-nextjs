"use client"
import React from 'react';
import { useSession, signOut } from "next-auth/react";

const LogOutButton = () => {
    return (
        <button onClick={() => signOut()} className='btn bg-base-200 text-white'>Logout</button>
    );
};

export default LogOutButton;