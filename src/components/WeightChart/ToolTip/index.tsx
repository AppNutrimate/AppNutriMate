import React from 'react';
import { TooltipContainer, TooltipText } from '../styles';

interface TooltipProps {
  x: number;
  y: number;
  value: number;
  visible: boolean;
}

export const ToolTip = ({ x, y, value, visible }: TooltipProps) => {
  if (!visible) return null;

  return (
    <TooltipContainer style={{ top: y + 10, left: x - 20 }}>
      <TooltipText>{value} kg</TooltipText>
    </TooltipContainer>
  );
};