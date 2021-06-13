export const commands = {}

export function Command({ name, description }) {
  return function (target, key, descriptor) {
    commands[name] = { description, key }
    return descriptor
  }
}
