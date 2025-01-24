import { SignInForm } from "@/features/auth/components/sign-in-form";
import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="bg-gradient flex h-screen w-full items-center justify-center">
            <div className="flex h-4/5 w-3/4 overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="h-full w-0 md:w-1/2 lg:w-3/5">
                    <Image
                        src="/auth-bg.png"
                        alt="Sign in"
                        width={1920}
                        height={688}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-4 p-12 md:w-1/2 md:p-8 lg:w-2/5">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="w-12 md:w-10 lg:w-12"
                        />
                        <h1
                            className={cn(
                                "text-2xl font-semibold lg:text-3xl",
                                poppins.className,
                            )}
                        >
                            Tech Heim
                        </h1>
                    </div>
                    <h2
                        className={cn(
                            "text-center text-xl font-semibold",
                            poppins.className,
                        )}
                    >
                        Nice to see you again
                    </h2>
                    <SignInForm />
                    <p className="text-center text-sm">
                        Dont have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
