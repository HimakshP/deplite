export declare function createDepliteClient(config: {
    programId: string;
    admin: string;
    rpc?: string;
}): {
    get: (flagName: string) => Promise<boolean>;
    subscribe: (flagName: string, callback: (value: boolean) => void) => () => void;
};
