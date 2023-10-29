"use client"
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {FcGoogle} from 'react-icons/fc/'
const SignIn = () => {
   
    return ( 
        <section className="mx-auto w-fit flex items-center py-8 container gap-10 mt-8 rounded-lg border-primary border-2 lg:w-1/3 flex-col">
            
            <h1 className='text-lg lg:text-2xl'>Faça Login</h1>
            <Button
                variant="outline"
                className="justify-center gap-2 lg:w-1/2 items-center flex"
                onClick={() => signIn("google", { callbackUrl: "/" })}
            >
                <FcGoogle/>Sign in with Google
            </Button>
    </section>
     );
}
 
export default SignIn;