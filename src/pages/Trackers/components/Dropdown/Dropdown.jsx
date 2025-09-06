import { useState } from "react";
import Dropdown from "@/components/Dropdown/Dropdown";

import DropAdd from "./components/DropAdd";
import DropdownItem from "./components/DropdownItem";

export default function TrackerDropdown({ project, setProject, setPage, setGlobalRender }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
    array.unshift(isEn ? "All" : "Всі")
    const [render, setRender] = useState(false)

    return (
        <Dropdown name={project}>
            {array.map((el, index) => <DropdownItem key={el + index} el={el} setProject={setProject} setPage={setPage} setGlobalRender={setGlobalRender} />)}
            <DropAdd makeRender={() => setRender(!render)} />
        </Dropdown>
    );
}