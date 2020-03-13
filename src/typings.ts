export interface Option {
  [label: string]: any;
}

export interface OptionArray extends Array<Option> {}

export interface Options extends Option, OptionArray {}

export interface ParsedOption {
  label: string, value: string
}

export interface ParsedOptionArray extends Array<ParsedOption> {}

export type Primitive = boolean | number | string | symbol;

