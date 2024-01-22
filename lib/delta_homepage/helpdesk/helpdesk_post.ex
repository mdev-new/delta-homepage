defmodule DeltaHomepage.Helpdesk.HelpdeskPost do
  use Ecto.Schema
  import Ecto.Changeset

  alias DeltaHomepage.Accounts.User

  schema "helpdesk" do
    field :status, :string
    field :problem, :string
    field :place, :string
    field :assigned, :string
    field :image_path, :string, default: ""
    belongs_to :user, User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(helpdesk_post, attrs) do
    helpdesk_post
    |> cast(attrs, [:problem, :place, :assigned, :author])
    |> validate_required([:problem, :place, :assigned, :author])
  end
end
