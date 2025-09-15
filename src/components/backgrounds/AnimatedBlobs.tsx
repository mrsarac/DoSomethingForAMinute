"use client";

import React from "react";

export default function AnimatedBlobs() {
  return (
    <>
      <div aria-hidden className="animated-bg fixed inset-0 -z-10 pointer-events-none dark:hidden" />
      <div aria-hidden className="animated-bg-dark fixed inset-0 -z-10 pointer-events-none hidden dark:block" />
    </>
  );
}

