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
            <h1 className="hidden font-semibold md:block md:text-xl lg:text-2xl">
                Dashboard
            </h1>
        </div>
    );
};
