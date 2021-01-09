const create_config = require('../core/config')

const env = process.env.NODE_ENV;

test('should return default config', () => {
    const cnf = create_config("development")
    expect(cnf).toBeDefined()
    expect(cnf.config_id).toBe("development")
})

test('should return production config', () => {
    const cnf = create_config("production")
    expect(cnf.config_id).toBe("production")
})

test('should return test config', () => {
    const cnf = create_config("test")
    expect(cnf.config_id).toBe("test")
})

test(`should return test config if config_type is empty string; NODE_ENV = ${env}`, () => {
    const cnf = create_config("")
    expect(cnf.config_id).toBe("test")
})

test(`should return test config if config_type not passed; NODE_ENV = ${env}`, () => {
    const cnf = create_config()
    expect(cnf.config_id).toBe("test")
})

test('should return default config if passed wrong type for config_type', () => {
    const cnf = create_config(true)
    expect(cnf.config_id).toBe("development")
})

test('should return default config if passed not existing string-key for config_type', () => {
    const cnf = create_config("blabla")
    expect(cnf.config_id).toBe("development")
})
