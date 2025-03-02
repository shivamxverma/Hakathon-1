"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="p-8 m-10 flex justify-center">
        <button className="bg-black text-white px-4 py-2 rounded-lg pointer-cursor"
        onClick={()=>router.push('/dashboard')}
        >
          Go to Dashboard
        </button>
      </div>
    </>
  );
}
