defmodule DeltaHomepage.HelpdeskFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `DeltaHomepage.Helpdesk` context.
  """

  @doc """
  Generate a helpdesk_post.
  """
  def helpdesk_post_fixture(attrs \\ %{}) do
    {:ok, helpdesk_post} =
      attrs
      |> Enum.into(%{
        assigned: "some assigned",
        place: "some place",
        problem: "some problem",
        status: "some status",
        time: 42
      })
      |> DeltaHomepage.Helpdesk.create_helpdesk_post()

    helpdesk_post
  end
end
