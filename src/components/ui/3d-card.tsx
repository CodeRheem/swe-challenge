import React, { useState, useRef, type JSX } from 'react';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = '',
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseEntered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${className} perspective`}
      style={{
        perspective: '1200px',
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: isMouseEntered
            ? `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isMouseEntered ? 'none' : 'transform 0.6s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

interface CardItemProps {
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const CardItem: React.FC<CardItemProps> = ({
  children,
  className = '',
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  as: Component = 'div',
}) => {
  return React.createElement(
    Component,
    {
      className: className,
      style: {
        transformStyle: 'preserve-3d',
        transform: `translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transition: 'transform 0.2s ease-out',
      },
    },
    children
  );
};
