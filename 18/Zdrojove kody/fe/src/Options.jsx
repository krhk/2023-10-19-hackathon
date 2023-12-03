import React, {useEffect} from "react";
import Slider from "@mui/material/Slider";

export default function Options() {

    const loadPrefs = () => {
        let data = JSON.parse(localStorage.getItem("preferences"))
        if(data){
        setEdu(data[0])
        setHousing(data[1])
        setEcon(data[2])
        setNature(data[3])
        setPop(data[4])
        setWork(data[5])
        }

    }

    const [edu, setEdu] = React.useState(50);
    const handleEdu = (event, newValue) => {
        setEdu(newValue);
        save();
    }
    
    const [housing, setHousing] = React.useState(50);
    const handleHousing = (event, newHousing) => {
        setHousing(newHousing);
        save();
    }

    const [econ, setEcon] = React.useState(50);
    const handleEcon = (event, newEcon) => {
        setEcon(newEcon);
        save();
    }

    const [nature, setNature] = React.useState(50);
    const handleNature = (event, newNature) => {
        setNature(newNature);
        save();
    }

    const [pop, setPop] = React.useState(50);
    const handlePop = (event, newPop) => {
        setPop(newPop);
        save();
    }

    const [work, setWork] = React.useState(50);
    const handleWork = (event, newWork) => {
        setWork(newWork);
        save();
    }

    const save = () => {
        localStorage.setItem("preferences", JSON.stringify([edu, housing, econ, nature, pop, work]))
    }
    
    useEffect(() => {
        loadPrefs();
    }, [])

    return (
    <div>
        <h2>Upravit hodnotící algoritmus:</h2>
        <h4>Vzdělávání</h4>
        <Slider aria-label="Vzdělávání" valueLabelDisplay="auto" value={edu} onChange={handleEdu}/>
        <h4>Bydlení</h4>
        <Slider aria-label="Bydlení" valueLabelDisplay="auto" value={housing} onChange={handleHousing}/>
        <h4>Ekonomika</h4>
        <Slider aria-label="Ekonomika" valueLabelDisplay="auto" value={econ} onChange={handleEcon}/>
        <h4>Příroda</h4>
        <Slider aria-label="Příroda" valueLabelDisplay="auto" value={nature} onChange={handleNature}/>
        <h4>Populace</h4>
        <Slider aria-label="Populace" valueLabelDisplay="auto" value={pop} onChange={handlePop}/>
        <h4>Zaměstnání</h4>
        <Slider aria-label="Zaměstnání" valueLabelDisplay="auto" value={work} onChange={handleWork}/>
    </div>
  );
}
