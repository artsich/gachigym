import {generateId} from "./id-generator";


it("smoke", async () => {
	expect(generateId()).not.toBe("");
});
