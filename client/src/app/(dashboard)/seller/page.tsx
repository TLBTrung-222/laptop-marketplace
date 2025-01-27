"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    ArrowDown,
    ArrowUp,
    Box,
    DollarSign,
    ShoppingCart,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

// Updated fake data
const monthlyData = [
    { month: "Jan", revenue: 820, sales: 350 },
    { month: "Feb", revenue: 932, sales: 480 },
    { month: "Mar", revenue: 901, sales: 550 },
    { month: "Apr", revenue: 934, sales: 590 },
    { month: "May", revenue: 1290, sales: 800 },
    { month: "Jun", revenue: 1330, sales: 720 },
    { month: "Jul", revenue: 1320, sales: 670 },
    { month: "Aug", revenue: 1450, sales: 900 },
    { month: "Sep", revenue: 1200, sales: 850 },
    { month: "Oct", revenue: 1390, sales: 780 },
    { month: "Nov", revenue: 1578, sales: 920 },
    { month: "Dec", revenue: 1420, sales: 850 },
];

const progressData = [
    {
        name: "Progress",
        value: 75.55,
        fill: "hsl(var(--admin-primary-500))",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-6 pt-6 md:px-4">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-admin/20 p-2">
                                <DollarSign className="h-4 w-4 text-admin" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Total Revenue
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold">$82,950</h3>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                                +12%
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
                            <h3 className="text-2xl font-bold">28,450</h3>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                                +18%
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
                            <h3 className="text-2xl font-bold">312</h3>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-600">
                                +5%
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
                            <h3 className="text-2xl font-bold">$32,800</h3>
                            <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-600">
                                -8%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <CardContent className="w-full p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Sales Progress</h3>
                                <p className="text-sm text-muted-foreground">
                                    This Quarter
                                </p>
                            </div>
                        </div>
                        <div className="h-[150px] sm:h-[200px] lg:h-[300px]">
                            <ChartContainer
                                config={{
                                    progress: {
                                        label: "Progress",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                                className="mx-auto h-[150px] w-full sm:h-[200px] lg:h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height={150}>
                                    <RadialBarChart
                                        innerRadius="65%"
                                        outerRadius="85%"
                                        data={progressData}
                                        startAngle={120}
                                        endAngle={-180}
                                    >
                                        <RadialBar
                                            background
                                            dataKey="value"
                                            cornerRadius={30}
                                            fill="hsl(var(--chart-2))"
                                        />
                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="fill-primary text-xl font-bold"
                                        >
                                            75.55%
                                        </text>
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Target
                                </p>
                                <p className="text-lg font-medium">
                                    $25k{" "}
                                    <ArrowDown className="inline h-4 w-4 text-red-500" />
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Revenue
                                </p>
                                <p className="text-lg font-medium">
                                    $18.9k{" "}
                                    <ArrowUp className="inline h-4 w-4 text-green-500" />
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Today
                                </p>
                                <p className="text-lg font-medium">
                                    $2.1k{" "}
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
                        <div className="h-[300px] w-full">
                            <ChartContainer
                                config={{
                                    revenue: {
                                        label: "Revenue",
                                        color: "hsl(var(--admin-primary-500))",
                                    },
                                    sales: {
                                        label: "Sales",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                                className="h-[300px] w-full"
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart
                                        data={monthlyData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorRevenue"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="hsl(var(--chart-2))"
                                                    stopOpacity={0.4}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="hsl(var(--chart-2))"
                                                    stopOpacity={0.05}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="colorSales"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="hsl(var(--admin-primary-500))"
                                                    stopOpacity={0.4}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="hsl(var(--admin-primary-500))"
                                                    stopOpacity={0.05}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="hsl(var(--muted-foreground))"
                                            fontSize={12}
                                        />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="hsl(var(--chart-2))"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="hsl(var(--admin-primary-500))"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorSales)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
