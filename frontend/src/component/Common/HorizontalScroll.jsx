import React, { useState, useRef, useEffect } from 'react';

const HorizontalScroll = ({ children,currentPredctionList }) => {
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

  useEffect(() => {
    if (containerRef.current && currentPredctionList?.length > 0) {
      const cardWidth = 330; // width of each card
      const margin = 10; // margin of each card
      const totalCardWidth = cardWidth + margin * 2;
      const centerCardIndex = 3; // index of the card to center
      const scrollPosition = centerCardIndex * totalCardWidth - (containerRef.current.offsetWidth / 2) + (cardWidth / 2);

      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentPredctionList]);

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
