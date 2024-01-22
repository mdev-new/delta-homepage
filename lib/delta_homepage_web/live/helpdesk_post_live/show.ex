defmodule DeltaHomepageWeb.HelpdeskPostLive.Show do
  use DeltaHomepageWeb, :live_view

  alias DeltaHomepage.Helpdesk

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(:helpdesk_post, Helpdesk.get_helpdesk_post!(id))}
  end

  defp page_title(:show), do: "Show Helpdesk post"
  defp page_title(:edit), do: "Edit Helpdesk post"
end
