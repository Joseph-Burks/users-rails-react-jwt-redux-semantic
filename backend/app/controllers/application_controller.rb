class ApplicationController < ActionController::API
    before_action :logged_in?

    def current_user
        begin
            method, token = request.headers[:Authorization].split(' ')
            if method === 'Bearer'
                payload, header = JWT.decode(token, 'Hide this secret!')
                return User.find(payload['user_id'])
            end
        rescue
            raise Exception.new('You must be logged in to make this request.')
        end
    end

    def logged_in?
        !!current_user
    end

end
