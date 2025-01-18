import { Logo } from "./logo";
import { Navbar } from "./navbar";

export const Sidebar = () => {
    return (
        <div className="flex h-screen w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
            <Logo />
            <Navbar />
        </div>
    );
};
