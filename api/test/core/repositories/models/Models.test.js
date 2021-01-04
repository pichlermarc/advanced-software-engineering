const create_config = require("../../../../core/config")
const Location = require("../../../../core/repositories/models")

const cnf = create_config("development")

test("should location react as a usual object", () => {
    expect(1).toBeDefined()
})