/**
 * This Babel plugin transforms private methods and properties to public methods and properties.
 *
 * The reason for doing this is that Babels default plugin '@babel/plugin-transform-private-methods'
 * generates code that causes performance overhead in order to emulate "private" semantics as correct as possible.
 *
 * For example,
 *
 * ```
 * class A {
 *  #propA = 'Hi'
 *
 *  #speak() {
 *    console.log(this.#propA)
 *  }
 * }
 * ```
 *
 * is converted to:
 *
 * ```
 * class A {
 *  __propA = 'Hi'
 *
 *  __speak() {
 *    console.log(this.__propA)
 *  }
 * }
 * ```
 */
export function babelPluginPrivateToPublic() {
  return {
    name: "babel-plugin-private-to-public",
    visitor: {
      ClassDeclaration(path) {
        path.traverse(internalVisitor)
      }
    }
  }
}

const internalVisitor = {
  ClassPrivateMethod(path) {

    // Handle private methods
    const privateMethodName = path.node.key.id.name;
    path.replaceWith({
      type: 'ClassMethod',
      key: {
        type: 'Identifier',
        name: `__${privateMethodName}`, // Convert private to public
      },
      params: path.node.params,
      async: path.node.async,
      generator: path.node.generator,
      body: path.node.body,
      computed: false,
      static: path.node.static,
      kind: path.node.kind, // e.g., "method", "get", or "set"
    });
  },
  ClassPrivateProperty(path) {
    const privateName = path.node.key.id.name;
    path.replaceWith({
      type: 'ClassProperty',
      key: {
        type: 'Identifier',
        name: `__${privateName}`, // Convert to public with a prefixed name
      },
      value: path.node.value,
      computed: false,
      static: path.node.static,
    });
  },
  PrivateName(path) {
    const privateName = path.node.id.name;
    path.replaceWith({
      type: 'Identifier',
      name: `__${privateName}`, // Convert to public with a prefixed name
    });
  },
}
