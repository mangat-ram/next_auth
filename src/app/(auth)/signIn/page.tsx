import { useToast } from '@/components/ui/use-toast';
import { signInSchemaVal } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  // const {username,password} = 
  const form = useForm<z.infer<typeof signInSchemaVal>>({
    resolver: zodResolver(signInSchemaVal),
    defaultValues: {
      identifier:'',
      password:''
    }
  })

  const submitLogin = async (data: z.infer<typeof signInSchemaVal>) => {
    await signIn('credentials',{
      identifier: data.identifier,
      password: data.password
    })
  }


  return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Log In
          </h1>
          <p className="mb-4">
            enter email and password to Sign In
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your email" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="password" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {
                  isSubmitting ? (<>
                    <Loader2 
                      className="mr-2 h-4 w-4 animate-spin" 
                    /> Please wait
                  </>) : ("SignIn")
              }
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignIn