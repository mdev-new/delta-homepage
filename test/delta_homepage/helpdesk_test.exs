defmodule DeltaHomepage.HelpdeskTest do
  use DeltaHomepage.DataCase

  alias DeltaHomepage.Helpdesk

  describe "helpdesk" do
    alias DeltaHomepage.Helpdesk.HelpdeskPost

    import DeltaHomepage.HelpdeskFixtures

    @invalid_attrs %{status: nil, time: nil, problem: nil, place: nil, assigned: nil}

    test "list_helpdesk/0 returns all helpdesk" do
      helpdesk_post = helpdesk_post_fixture()
      assert Helpdesk.list_helpdesk() == [helpdesk_post]
    end

    test "get_helpdesk_post!/1 returns the helpdesk_post with given id" do
      helpdesk_post = helpdesk_post_fixture()
      assert Helpdesk.get_helpdesk_post!(helpdesk_post.id) == helpdesk_post
    end

    test "create_helpdesk_post/1 with valid data creates a helpdesk_post" do
      valid_attrs = %{status: "some status", time: 42, problem: "some problem", place: "some place", assigned: "some assigned"}

      assert {:ok, %HelpdeskPost{} = helpdesk_post} = Helpdesk.create_helpdesk_post(valid_attrs)
      assert helpdesk_post.status == "some status"
      assert helpdesk_post.time == 42
      assert helpdesk_post.problem == "some problem"
      assert helpdesk_post.place == "some place"
      assert helpdesk_post.assigned == "some assigned"
    end

    test "create_helpdesk_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Helpdesk.create_helpdesk_post(@invalid_attrs)
    end

    test "update_helpdesk_post/2 with valid data updates the helpdesk_post" do
      helpdesk_post = helpdesk_post_fixture()
      update_attrs = %{status: "some updated status", time: 43, problem: "some updated problem", place: "some updated place", assigned: "some updated assigned"}

      assert {:ok, %HelpdeskPost{} = helpdesk_post} = Helpdesk.update_helpdesk_post(helpdesk_post, update_attrs)
      assert helpdesk_post.status == "some updated status"
      assert helpdesk_post.time == 43
      assert helpdesk_post.problem == "some updated problem"
      assert helpdesk_post.place == "some updated place"
      assert helpdesk_post.assigned == "some updated assigned"
    end

    test "update_helpdesk_post/2 with invalid data returns error changeset" do
      helpdesk_post = helpdesk_post_fixture()
      assert {:error, %Ecto.Changeset{}} = Helpdesk.update_helpdesk_post(helpdesk_post, @invalid_attrs)
      assert helpdesk_post == Helpdesk.get_helpdesk_post!(helpdesk_post.id)
    end

    test "delete_helpdesk_post/1 deletes the helpdesk_post" do
      helpdesk_post = helpdesk_post_fixture()
      assert {:ok, %HelpdeskPost{}} = Helpdesk.delete_helpdesk_post(helpdesk_post)
      assert_raise Ecto.NoResultsError, fn -> Helpdesk.get_helpdesk_post!(helpdesk_post.id) end
    end

    test "change_helpdesk_post/1 returns a helpdesk_post changeset" do
      helpdesk_post = helpdesk_post_fixture()
      assert %Ecto.Changeset{} = Helpdesk.change_helpdesk_post(helpdesk_post)
    end
  end
end
