defmodule DeltaHomepageWeb.HelpdeskPostLiveTest do
  use DeltaHomepageWeb.ConnCase

  import Phoenix.LiveViewTest
  import DeltaHomepage.HelpdeskFixtures

  @create_attrs %{status: "some status", time: 42, problem: "some problem", place: "some place", assigned: "some assigned"}
  @update_attrs %{status: "some updated status", time: 43, problem: "some updated problem", place: "some updated place", assigned: "some updated assigned"}
  @invalid_attrs %{status: nil, time: nil, problem: nil, place: nil, assigned: nil}

  defp create_helpdesk_post(_) do
    helpdesk_post = helpdesk_post_fixture()
    %{helpdesk_post: helpdesk_post}
  end

  describe "Index" do
    setup [:create_helpdesk_post]

    test "lists all helpdesk", %{conn: conn, helpdesk_post: helpdesk_post} do
      {:ok, _index_live, html} = live(conn, ~p"/helpdesk")

      assert html =~ "Listing Helpdesk"
      assert html =~ helpdesk_post.status
    end

    test "saves new helpdesk_post", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, ~p"/helpdesk")

      assert index_live |> element("a", "New Helpdesk post") |> render_click() =~
               "New Helpdesk post"

      assert_patch(index_live, ~p"/helpdesk/new")

      assert index_live
             |> form("#helpdesk_post-form", helpdesk_post: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#helpdesk_post-form", helpdesk_post: @create_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/helpdesk")

      html = render(index_live)
      assert html =~ "Helpdesk post created successfully"
      assert html =~ "some status"
    end

    test "updates helpdesk_post in listing", %{conn: conn, helpdesk_post: helpdesk_post} do
      {:ok, index_live, _html} = live(conn, ~p"/helpdesk")

      assert index_live |> element("#helpdesk-#{helpdesk_post.id} a", "Edit") |> render_click() =~
               "Edit Helpdesk post"

      assert_patch(index_live, ~p"/helpdesk/#{helpdesk_post}/edit")

      assert index_live
             |> form("#helpdesk_post-form", helpdesk_post: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert index_live
             |> form("#helpdesk_post-form", helpdesk_post: @update_attrs)
             |> render_submit()

      assert_patch(index_live, ~p"/helpdesk")

      html = render(index_live)
      assert html =~ "Helpdesk post updated successfully"
      assert html =~ "some updated status"
    end

    test "deletes helpdesk_post in listing", %{conn: conn, helpdesk_post: helpdesk_post} do
      {:ok, index_live, _html} = live(conn, ~p"/helpdesk")

      assert index_live |> element("#helpdesk-#{helpdesk_post.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#helpdesk-#{helpdesk_post.id}")
    end
  end

  describe "Show" do
    setup [:create_helpdesk_post]

    test "displays helpdesk_post", %{conn: conn, helpdesk_post: helpdesk_post} do
      {:ok, _show_live, html} = live(conn, ~p"/helpdesk/#{helpdesk_post}")

      assert html =~ "Show Helpdesk post"
      assert html =~ helpdesk_post.status
    end

    test "updates helpdesk_post within modal", %{conn: conn, helpdesk_post: helpdesk_post} do
      {:ok, show_live, _html} = live(conn, ~p"/helpdesk/#{helpdesk_post}")

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Helpdesk post"

      assert_patch(show_live, ~p"/helpdesk/#{helpdesk_post}/show/edit")

      assert show_live
             |> form("#helpdesk_post-form", helpdesk_post: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      assert show_live
             |> form("#helpdesk_post-form", helpdesk_post: @update_attrs)
             |> render_submit()

      assert_patch(show_live, ~p"/helpdesk/#{helpdesk_post}")

      html = render(show_live)
      assert html =~ "Helpdesk post updated successfully"
      assert html =~ "some updated status"
    end
  end
end
