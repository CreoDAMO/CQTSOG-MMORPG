import { SignatureLike } from '@ethersproject/bytes';
import { PopulatedTransaction } from 'ethers';
import { StkABPTMigratorInterface } from './typechain/StkABPTMigrator';
export declare class StkABPTMigratorService {
    readonly contractAddress: string;
    readonly contractInterface: StkABPTMigratorInterface;
    constructor(contractAddress: string);
    migrate(user: string, amount: string, tokenOutAmountsMin: string[], poolOutAmountMin: string): PopulatedTransaction;
    migrateWithPermit({ user, amount, tokenOutAmountsMin, poolOutAmountMin, signature, deadline, }: {
        user: string;
        amount: string;
        tokenOutAmountsMin: string[];
        poolOutAmountMin: string;
        signature: SignatureLike;
        deadline: string;
    }): PopulatedTransaction;
}
//# sourceMappingURL=index.d.ts.map