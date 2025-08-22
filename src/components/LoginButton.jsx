"use client"
import {  signIn } from 'next-auth/react';

const LoginButton = () => {
    return (
        <div>
            <button className='btn bg-base-200 text-white' onClick={() => signIn()}>Login</button>
        </div>
    );
};

export default LoginButton;