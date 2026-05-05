import { AuthSessionProvider } from "@/components/auth-session-provider"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>
}
