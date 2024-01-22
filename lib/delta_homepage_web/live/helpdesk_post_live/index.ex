defmodule DeltaHomepageWeb.HelpdeskPostLive.Index do
  use DeltaHomepageWeb, :live_view

  alias DeltaHomepage.Helpdesk
  alias DeltaHomepage.Helpdesk.HelpdeskPost

  @impl true
  def mount(_params, _session, socket) do
    {:ok, stream(socket, :helpdesk, Helpdesk.list_helpdesk())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Helpdesk post")
    |> assign(:helpdesk_post, Helpdesk.get_helpdesk_post!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Helpdesk post")
    |> assign(:helpdesk_post, %HelpdeskPost{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Helpdesk")
    |> assign(:helpdesk_post, nil)
  end

  @impl true
  def handle_info({DeltaHomepageWeb.HelpdeskPostLive.FormComponent, {:saved, helpdesk_post}}, socket) do
    {:noreply, stream_insert(socket, :helpdesk, helpdesk_post)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    helpdesk_post = Helpdesk.get_helpdesk_post!(id)
    {:ok, _} = Helpdesk.delete_helpdesk_post(helpdesk_post)

    {:noreply, stream_delete(socket, :helpdesk, helpdesk_post)}
  end
end
