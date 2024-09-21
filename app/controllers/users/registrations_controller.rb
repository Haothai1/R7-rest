class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_forgery_protection only: [:create]

  def create
    super
    # Set the CSRF token cookie after successful registration
    cookies["CSRF-TOKEN"] = { value: form_authenticity_token, secure: true, same_site: :None, partitioned: true }
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed resource
  end

  def register_success
    render json: { message: 'Signed up successfully.' }, status: :created
  end

  def register_failed resource
    render json: { message: resource.errors.full_messages }, status: :bad_request
  end
end
