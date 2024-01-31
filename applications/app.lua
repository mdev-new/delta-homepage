local lapis = require("lapis")
local app = lapis.Application()

local loggedIn = false

-- this is sort of ugly but it works...
app:before_filter(function(self)
  if not loggedIn then
    self:write({redirect_to = '/'})
  end
end)

app:get("index", "/", function()
  return "<h1>My application</h1>"
end)

app:get("test", "/test", function()
  return "<h1>My application 2</h1>"
end)

return app
