import React, { useEffect, useState } from 'react';
import "./Table.css"
export default function Table() {
    const [list, setList] = useState([
        { type: `turtle`, icon: `🐢` },
        { type: `octopus`, icon: `🐙` },
        { type: `fish`, icon: `🐠` },
        { type: `flamingo`, icon: `🦩` },
        { type: `penguin`, icon: `🐧` }
    ]);
    useEffect(() => {
    const interval = setInterval(() => {
        
        setList((prevList) => {
            const inactiveItems = prevList.filter(item => !item.active);
            
            if (inactiveItems.length === 0) {
                clearInterval(interval); // Зупиняємо інтервал, якщо всі об'єкти активовані
                return prevList;
            }

            const randomIndex = Math.floor(Math.random() * inactiveItems.length);
            const itemToActivate = inactiveItems[randomIndex];
            console.log(inactiveItems)
            return prevList.map(item =>
                item === itemToActivate ? { ...item, active: true } : item
            );
            
        });
        
    }, 1000);

    // Очищення інтервалу при демонтажі компонента
    return () => clearInterval(interval);
}, []);

    return (
        <table className="main_table" >
            <tbody>
                {list.map((animal, index) => (
                    <tr key={index}>
                        <td className={animal.active ? 'active-row' : ''} >{animal.type}</td>
                        <td >{animal.icon}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}



