import React, { useState } from 'react';
interface DraggableDivProps {
    id: string;
    text: string;
    onDragStart: any;
}
const DraggableDiv: React.FC<DraggableDivProps> = ({ id, text, onDragStart }) => {
    const handleDragStart = (e: any) => {
        e.dataTransfer.setData('id', id);
        // Pass the div ID to the onDragStart callback
        onDragStart(id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{ cursor: 'move' }}>
            {text}
        </div>
    );
};

export default DraggableDiv;
