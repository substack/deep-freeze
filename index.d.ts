export default function deepFreeze<T extends Record<string, any>>(o: T): Readonly<T>;
