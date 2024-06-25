import { MakeMyTripPage} from "@pages/MakeMyTripPage";
import { test as base } from "@playwright/test";

type MyFixtures = {
    makeMyTripPage: MakeMyTripPage;
};

export const test = base.extend<MyFixtures>({
    makeMyTripPage: async ({ page }, use) => {
        await use(new MakeMyTripPage(page));
    }
});
export { expect } from "@playwright/test";
