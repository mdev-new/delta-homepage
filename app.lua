local lapis = require("lapis")
local app = lapis.Application()

local loggedIn = false

string.startswith = function(self, str)
    return self:find('^' .. str) ~= nil
end

-- this is sort of ugly but it works...
app:before_filter(function(self)
  if self.route_name:startswith("app") and not loggedIn then
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
