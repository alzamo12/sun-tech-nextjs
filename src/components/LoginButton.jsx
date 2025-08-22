"use client";
import Link from 'daisyui/components/link';
import {  signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push("/login")} className='btn bg-base-200 text-white' >Login</button>
        </div>
    );
};

export default LoginButton;