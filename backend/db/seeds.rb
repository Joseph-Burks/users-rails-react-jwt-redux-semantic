# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

john = User.create!({email: 'john.doe@example.com', username: 'John Doe', password: '123456'})

john.avatar.attach(
    io: File.open('./public/avatars/Taco.png'),
    filename: 'Taco.png',
    content_type: 'application/png'
)