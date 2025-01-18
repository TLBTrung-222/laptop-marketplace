import Image from "next/image";

export const Logo = () => {
    return (
        <div className="flex w-full items-center gap-3 px-5 py-4">
            <Image src="/logo.svg" alt="Logo" width={34} height={34} />
            <h1 className="text-2xl font-semibold">Admin</h1>
        </div>
    );
};
