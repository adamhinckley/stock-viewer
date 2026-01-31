declare module "react-window" {
  import { ComponentType, ReactNode } from "react";

  export interface FixedSizeListProps {
    children: ComponentType<{ index: number; style: React.CSSProperties }>;
    className?: string;
    height: number | string;
    itemCount: number;
    itemSize: number;
    width?: number | string;
    [key: string]: any;
  }

  export const FixedSizeList: ComponentType<FixedSizeListProps>;
  export const VariableSizeList: any;
  export const FixedSizeGrid: any;
  export const VariableSizeGrid: any;
}
