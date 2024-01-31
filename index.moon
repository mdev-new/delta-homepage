lapis = require "lapis"

class extends lapis.Application
  @enable "etlua"
  @include "app", path: "/app", name: "app."
  "/": =>
    "Welcome to Lapis #{require "lapis.version"}!"

