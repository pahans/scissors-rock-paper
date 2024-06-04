import * as React from "react";

export interface StatProps {
  label: string;
  value: number;
}

export const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div>
    <span className="text-gold-500">{label}: </span>
    <span className="text-white">{value}</span>
  </div>
);
