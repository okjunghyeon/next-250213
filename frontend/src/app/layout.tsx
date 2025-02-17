import type { Metadata } from "next";
import "./globals.css";
import ClinetLayout from "./ClientLayout";
import client from "@/lib/backend/client";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const me = response.data
    ? response.data.data
    : {
        id: 0,
        nickname: "",
        createdDate: "",
        modifiedDate: "",
      };

  return <ClinetLayout me={me}>{children}</ClinetLayout>;
}
