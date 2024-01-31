local lapis = require("lapis")
local app = lapis.Application()

app:enable("etlua")
app.layout = require("views.layout")

local real_app = require('app')
app:include(real_app, {
  path = '/app',
  name = "app."
})

app:get("index", "/", function(self)
  return "<h1>Delta SSIE</h1><br><a href='/app'>Webova aplikace</a>"
end)

return app
