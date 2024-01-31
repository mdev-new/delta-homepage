lapis = require "lapis"

class extends lapis.Application
  @include "applications.app", path: "/app", name: "app."
  "/": =>
    "Welcome to Lapis #{require "lapis.version"}!"
