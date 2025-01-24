"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowDown,
    ArrowUp,
    Box,
    DollarSign,
    ShoppingCart,
} from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { month: "Jan", revenue: 600, sales: 400 },
    { month: "Feb", revenue: 800, sales: 600 },
    { month: "Mar", revenue: 700, sales: 800 },
    { month: "Apr", revenue: 900, sales: 700 },
    { month: "May", revenue: 800, sales: 600 },
    { month: "Jun", revenue: 950, sales: 700 },
    { month: "Jul", revenue: 1000, sales: 800 },
    { month: "Aug", revenue: 1200, sales: 600 },
    { month: "Sep", revenue: 1100, sales: 800 },
    { month: "Oct", revenue: 900, sales: 700 },
    { month: "Nov", revenue: 800, sales: 900 },
    { month: "Dec", revenue: 900, sales: 800 },
];

export default function Dashboard() {
    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-medium text-neutral-700">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-indigo-100 p-2">
                                <DollarSign className="h-4 w-4 text-indigo-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Total Revenue
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">$75,500</h3>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                                +10%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-green-100 p-2">
                                <ShoppingCart className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Total Sales
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">31,500</h3>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                                +15%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-red-100 p-2">
                                <Box className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Product SKU
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">247</h3>
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
                                0%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-orange-100 p-2">
                                <DollarSign className="h-4 w-4 text-orange-600" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Balance
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">$24,500</h3>
                            <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-600">
                                -25%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
                <Card>
                    <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Sales Progress</h3>
                                <p className="text-sm text-muted-foreground">
                                    This Quarter
                                </p>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <svg className="h-48 w-48 -rotate-90 transform">
                                <circle
                                    className="text-muted"
                                    strokeWidth="12"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="70"
                                    cx="96"
                                    cy="96"
                                    opacity={0.2}
                                />
                                <circle
                                    className="text-indigo-600"
                                    strokeWidth="12"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 * (1 - 0.7555)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="70"
                                    cx="96"
                                    cy="96"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-bold">
                                    75.55%
                                </span>
                                <span className="text-sm text-green-600">
                                    +10%
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Target
                                </p>
                                <p className="text-lg font-medium">
                                    $20k{" "}
                                    <ArrowDown className="inline h-4 w-4 text-red-500" />
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Revenue
                                </p>
                                <p className="text-lg font-medium">
                                    $16k{" "}
                                    <ArrowUp className="inline h-4 w-4 text-green-500" />
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Today
                                </p>
                                <p className="text-lg font-medium">
                                    $1.5k{" "}
                                    <ArrowUp className="inline h-4 w-4 text-green-500" />
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Statistics</h3>
                                <p className="text-sm text-muted-foreground">
                                    Revenue and Sales
                                </p>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#4F46E5"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
