export const keys = <T>(object: T) => Object.keys(object) as (keyof T)[];
