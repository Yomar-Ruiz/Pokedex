"use client";

import { useState } from "react";

export default function SearchBar(){
    const [search, setSearch] = useState("")

    return(
        <>
        <input
         type="text"
         placeholder="Pokemon...."
         value={search}
         onChange={(event) => setSearch(event.target.value)} />
         </>
    )
}