export interface RGB {
    h: number;
    s: number;
    b: number;
}
export declare function RGBToHSB(rgb: any): {
    h: number;
    s: number;
    b: number;
};
export declare function HEXToHSB(hex: any): {
    h: number;
    s: number;
    b: number;
};
export declare function HSBToRGB(hsb: any): {
    r: number;
    g: number;
    b: number;
};
export declare function HSBToHEX(hsb: any): string;
export declare function RGBSTo(rgbs: any): {
    r: any;
    g: any;
    b: any;
};
