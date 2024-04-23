import React, { useState, useRef } from 'react';

const HorizontalScroll = ({ children }) => {
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartX;
    containerRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event) => {
    containerRef.current.scrollLeft += event.deltaY;
  };

  return (
    <div
      className="horizontal-scroll-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div className="horizontal-scroll-content">{children}</div>
    </div>
  );
};

export default HorizontalScroll;
