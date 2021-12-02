import { VERIFIER_OPTIONS } from "./carsContractUtils";
import { initPactVerifier } from "./pactUtils";

describe('Verify contract with subservice', () => {
    it('should validate the expectations of a consumer', async (): Promise<any> => {
        return initPactVerifier(VERIFIER_OPTIONS).verifyProvider();
    });
});