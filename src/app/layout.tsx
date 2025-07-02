import { Redirects } from "@/app/redirects";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        {children}
        <Redirects />
    </>
}
