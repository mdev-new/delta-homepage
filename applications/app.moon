lapis = require "lapis"

class extends lapis.Application
  [index: ""]: =>
    "#{require "lapis.version"}!"
  [index: "/test"]: =>
    "dawg"
