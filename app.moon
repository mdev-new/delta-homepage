lapis = require "lapis"

class extends lapis.Application
  @enable "etlua"
  [index: "/"]: =>
    "Welcome to Lapis #{require "lapis.version"}!"

