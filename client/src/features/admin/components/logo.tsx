import Image from "next/image";

export const Logo = () => {
    return (
        <div className="w-full items-center justify-center gap-3 px-5 py-4 md:flex md:justify-start">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={34}
                height={34}
                className="size-8"
            />
            <h1 className="hidden text-2xl font-semibold md:block">Admin</h1>
        </div>
    );
};
