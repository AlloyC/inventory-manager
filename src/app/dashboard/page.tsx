"use client";

import { useUser } from "../Provider/UserContext";

function page() {
  const { firstName } = useUser();
  return <div>welcome</div>;
}

export default page;
