module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    /* max attributes-per-line and order-in-components
     ** we should use this later, when eslint-plugin-vue will support auto fixing this
     */
    "vue/max-attributes-per-line": 0,
    "vue/order-in-components": 0,
    "vue/attributes-order": 0,
    // less restricted v-for -> v-if rules
    "vue/no-confusing-v-for-v-if": 0,
    // allow paren-less arrow functions
    "arrow-parens": 0,
    "prefer-arrow-callback": 1,
    // allow async-await
    "generator-star-spacing": 0
  }
}
