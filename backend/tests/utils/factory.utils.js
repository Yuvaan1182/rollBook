import { faker } from "@faker-js/faker";

const STATUS_ENUM = ["active", "inactive", "pending", "suspended"];

// Utility function to randomly include or exclude a field
const maybe = (value) => (Math.random() > 0.5 ? value : undefined);

export const createTestClient = () => ({
  name: faker.person.fullName(), // Always present
  email: faker.internet.email(), // Always present
  phone: maybe(faker.string.numeric({ min: 6, max: 15 })), // Optional
  address: maybe(faker.location.streetAddress()), // Optional
  company: maybe(faker.company.name()), // Optional
  notes: maybe(faker.lorem.sentence()), // Optional
  country: maybe(faker.location.country()), // Optional
  countryCode: maybe(faker.location.countryCode()), // Optional
  preferredCurrency: maybe(faker.finance.currencyCode()), // Optional
  timezone: maybe(faker.location.timeZone()), // Optional
  tags: maybe([faker.lorem.word(), faker.lorem.word()]), // Optional
  status: maybe(faker.helpers.arrayElement(STATUS_ENUM)), // Optional
});
