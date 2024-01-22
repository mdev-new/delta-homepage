defmodule DeltaHomepage.Repo do
  use Ecto.Repo,
    otp_app: :delta_homepage,
    adapter: Ecto.Adapters.SQLite3
end
