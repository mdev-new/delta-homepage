defmodule DeltaHomepage.Helpdesk do
  @moduledoc """
  The Helpdesk context.
  """

  import Ecto.Query, warn: false
  alias DeltaHomepage.Repo

  alias DeltaHomepage.Helpdesk.HelpdeskPost

  @doc """
  Returns the list of helpdesk.

  ## Examples

      iex> list_helpdesk()
      [%HelpdeskPost{}, ...]

  """
  def list_helpdesk do
    Repo.all(HelpdeskPost)
  end

  @doc """
  Gets a single helpdesk_post.

  Raises `Ecto.NoResultsError` if the Helpdesk post does not exist.

  ## Examples

      iex> get_helpdesk_post!(123)
      %HelpdeskPost{}

      iex> get_helpdesk_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_helpdesk_post!(id), do: Repo.get!(HelpdeskPost, id)

  @doc """
  Creates a helpdesk_post.

  ## Examples

      iex> create_helpdesk_post(%{field: value})
      {:ok, %HelpdeskPost{}}

      iex> create_helpdesk_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_helpdesk_post(attrs \\ %{}) do
    %HelpdeskPost{}
    |> HelpdeskPost.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a helpdesk_post.

  ## Examples

      iex> update_helpdesk_post(helpdesk_post, %{field: new_value})
      {:ok, %HelpdeskPost{}}

      iex> update_helpdesk_post(helpdesk_post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_helpdesk_post(%HelpdeskPost{} = helpdesk_post, attrs) do
    helpdesk_post
    |> HelpdeskPost.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a helpdesk_post.

  ## Examples

      iex> delete_helpdesk_post(helpdesk_post)
      {:ok, %HelpdeskPost{}}

      iex> delete_helpdesk_post(helpdesk_post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_helpdesk_post(%HelpdeskPost{} = helpdesk_post) do
    Repo.delete(helpdesk_post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking helpdesk_post changes.

  ## Examples

      iex> change_helpdesk_post(helpdesk_post)
      %Ecto.Changeset{data: %HelpdeskPost{}}

  """
  def change_helpdesk_post(%HelpdeskPost{} = helpdesk_post, attrs \\ %{}) do
    HelpdeskPost.changeset(helpdesk_post, attrs)
  end
end
