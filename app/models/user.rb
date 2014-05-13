class User < ActiveRecord::Base
  # validates :name, presence: true
  # validates :email, presence: true, uniqueness: true, case_sensitive: false
  # validates(:password, { :length       => { :minimum => 8, :maximum => 16 },
  #                        :presence     => true,
  #                        :confirmation => true })
  has_secure_password

end
