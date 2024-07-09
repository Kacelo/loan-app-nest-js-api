export declare function encodePassword(rawPassword: string): string;
export declare function decodePassword(password: string, hash: string): Promise<boolean>;
