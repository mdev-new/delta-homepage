defmodule DeltaHomepageWeb.HelpdeskPostLive.FormComponent do
  use DeltaHomepageWeb, :live_component

  alias DeltaHomepage.Helpdesk

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Use this form to manage helpdesk_post records in your database.</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="helpdesk_post-form"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@form[:problem]} type="text" label="Problem" />
        <.input field={@form[:place]} type="text" label="Place" />
        <.input field={@form[:assigned]} type="text" label="Assigned" />
        <.input field={@form[:status]} type="text" label="Status" />
        <.input field={@form[:time]} type="number" label="Time" />
        <:actions>
          <.button phx-disable-with="Saving...">Save Helpdesk post</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  @impl true
  def update(%{helpdesk_post: helpdesk_post} = assigns, socket) do
    changeset = Helpdesk.change_helpdesk_post(helpdesk_post)

    {:ok,
     socket
     |> assign(assigns)
     |> assign_form(changeset)}
  end

  @impl true
  def handle_event("validate", %{"helpdesk_post" => helpdesk_post_params}, socket) do
    changeset =
      socket.assigns.helpdesk_post
      |> Helpdesk.change_helpdesk_post(helpdesk_post_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("save", %{"helpdesk_post" => helpdesk_post_params}, socket) do
    save_helpdesk_post(socket, socket.assigns.action, helpdesk_post_params)
  end

  defp save_helpdesk_post(socket, :edit, helpdesk_post_params) do
    case Helpdesk.update_helpdesk_post(socket.assigns.helpdesk_post, helpdesk_post_params) do
      {:ok, helpdesk_post} ->
        notify_parent({:saved, helpdesk_post})

        {:noreply,
         socket
         |> put_flash(:info, "Helpdesk post updated successfully")
         |> push_patch(to: socket.assigns.patch)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp save_helpdesk_post(socket, :new, helpdesk_post_params) do
    case Helpdesk.create_helpdesk_post(helpdesk_post_params) do
      {:ok, helpdesk_post} ->
        notify_parent({:saved, helpdesk_post})

        {:noreply,
         socket
         |> put_flash(:info, "Helpdesk post created successfully")
         |> push_patch(to: socket.assigns.patch)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    assign(socket, :form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
