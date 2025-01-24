import { Logo } from "./logo";
import { Navbar } from "./navbar";

export const Sidebar = () => {
    return (
        <div className="fixed bottom-0 left-0 top-0 z-50 flex min-h-screen w-auto flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-sm md:w-48 lg:w-64">
            <Logo />
            <Navbar />
        </div>
    );
};
