local lapis = require("lapis")
local app = lapis.Application()

app:get("/", function()
  return "Welcome to Lapis " .. require("lapis.version")
end)

app:get("/hello", function ()
  return "Hello world"
end)

return app

