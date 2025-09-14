/* eslint-disable @typescript-eslint/no-explicit-any */
// 


export const getNestedValue = (obj: any, path: string) => {
  // console.log(path)
  return path.split(/[\.\[\]]+/).filter(Boolean).reduce((acc, part) => acc && acc[part], obj);
};

interface BankMap {
  [code: string]: string;
}

interface BankOption {
  label: string;
  value: string;
}

export function transformBanks(banks: BankMap): BankOption[] {
  return Object.entries(banks)
    .map(([code, name]): BankOption => ({
      label: name,
      value: `${code}-${name}`
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}