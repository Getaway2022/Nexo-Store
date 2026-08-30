'use client';import{AdminAuthProvider}from'../src/context/AdminAuthContext';export function Providers({children}:{children:React.ReactNode}){return <AdminAuthProvider>{children}</AdminAuthProvider>}
