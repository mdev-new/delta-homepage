defmodule DeltaHomepageWeb.HomeLive do
  use DeltaHomepageWeb, :live_view

  # This file will contain

  @impl true
  def render(assigns) do
    ~H"""
    <h1 class="text-2xl">Delta Homepage</h1>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

end
