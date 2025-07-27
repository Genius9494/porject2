"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

import ButtonGradient from "../components/ButtonGradient";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/nav/SideBar";

import { WishlistProvider } from "../context/wishlistContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WishlistProvider>
      <main className="min-h-screen h-full grid background dark">
        <ButtonGradient />
        <GridContainer cols={12}>
          <SideBar />
          <MaxWidthWrapper className="col-span-full lg:col-span-10">
            <NavBar />
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#111",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  borderRadius: "10px"
                },
              }}
            />
          </MaxWidthWrapper>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}
