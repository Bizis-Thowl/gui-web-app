import React, { useState, useEffect } from 'react';

function HorizontalDrag(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function handleMouseMove(e) {
      if (dragging) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragging]);

  const handleMouseDown = e => {
    setDragging(true);
  };

  const handleMouseUp = e => {
    setDragging(false);
  };

  const draggableStyle = {
    position: 'relative',
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div>
      <div
        style={draggableStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {props.elem}
      </div>
    </div>
  );
}

export default HorizontalDrag;