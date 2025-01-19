type Props = {
    children: React.ReactNode;
    title: string;
};

export const ProductSection = ({ children, title }: Props) => {
    return (
        <div className="space-y-4 rounded-xl border-neutral-100 bg-white p-6 shadow-md">
            <h2 className="text-lg font-medium text-neutral-800">{title}</h2>
            {children}
        </div>
    );
};
