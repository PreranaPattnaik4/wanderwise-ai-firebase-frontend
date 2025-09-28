
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from './auth-provider';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { WanderwiseLogo } from './icons';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type SignUpValues = z.infer<typeof signUpSchema>;
type SignInValues = z.infer<typeof signInSchema>;

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.02,35.625,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
  );
}

export function SignInModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const { signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpForm = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) });
  const signInForm = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  const handleSignUp = async (values: SignUpValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUpWithEmail(values.email, values.password);
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (values: SignInValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmail(values.email, values.password);
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onTabChange = () => {
    setError(null);
    signInForm.reset();
    signUpForm.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs rounded-2xl bg-white/70 backdrop-blur-sm dark:bg-black/70 border-white/20">
        <DialogHeader className="items-center text-center">
            <WanderwiseLogo className="h-6 w-auto"/>
            <DialogTitle className="text-lg font-bold">Welcome back</DialogTitle>
            <DialogDescription className="text-xs">Sign in to continue.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="sign-in" className="w-full" onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="sign-in" className="text-xs">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up" className="text-xs">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in" className="mt-3">
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email-in" className="text-xs">Email</Label>
                <Input id="email-in" type="email" placeholder="m@example.com" {...signInForm.register('email')} className="h-8 text-xs" />
                {signInForm.formState.errors.email && <p className="text-red-500 text-xs">{signInForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-in" className="text-xs">Password</Label>
                <Input id="password-in" type="password" {...signInForm.register('password')} className="h-8 text-xs" />
                 {signInForm.formState.errors.password && <p className="text-red-500 text-xs">{signInForm.formState.errors.password.message}</p>}
              </div>
               <DialogFooter className="flex-col space-y-1 !mt-3">
                 {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full h-8 text-xs">
                  {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  Sign In
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="sign-up" className="mt-3">
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email-up" className="text-xs">Email</Label>
                <Input id="email-up" type="email" placeholder="m@example.com" {...signUpForm.register('email')} className="h-8 text-xs" />
                 {signUpForm.formState.errors.email && <p className="text-red-500 text-xs">{signUpForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-up" className="text-xs">Password</Label>
                <Input id="password-up" type="password" {...signUpForm.register('password')} className="h-8 text-xs" />
                 {signUpForm.formState.errors.password && <p className="text-red-500 text-xs">{signUpForm.formState.errors.password.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword-up" className="text-xs">Confirm Password</Label>
                <Input id="confirmPassword-up" type="password" {...signUpForm.register('confirmPassword')} className="h-8 text-xs" />
                {signUpForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs">{signUpForm.formState.errors.confirmPassword.message}</p>}
              </div>
               <DialogFooter className="flex-col space-y-1 !mt-3">
                 {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <Button type="submit" disabled={isLoading} className="w-full h-8 text-xs">
                  {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  Create Account
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/0 px-2 text-muted-foreground text-[10px]">Or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full rounded-full shadow-sm h-8 text-xs" onClick={handleGoogleSignIn} disabled={isLoading}>
          <GoogleIcon className="mr-2"/>
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}

    