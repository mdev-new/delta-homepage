local config = require("lapis.config")

config("development", {
  server = "nginx",
  code_cache = "off",
  num_workers = "1",
  session_name = "dhp_session",
  secret = "this is my very secure secret" -- todo change
})

