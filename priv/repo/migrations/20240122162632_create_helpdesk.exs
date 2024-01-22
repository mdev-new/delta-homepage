defmodule DeltaHomepage.Repo.Migrations.CreateHelpdesk do
  use Ecto.Migration

  def change do
    create table(:helpdesk) do
      add :problem, :string
      add :place, :string
      add :assigned, :string
      add :status, :string
      add :time, :integer
      add :author, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:helpdesk, [:author])
  end
end
