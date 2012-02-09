#!/usr/bin/env ruby

require 'rubygems'
require 'json'
require 'net/http'
require 'uri'

limit = ARGV[0] ? ARGV[0] : 1
url   = 'http://api.comicvine.com/characters/?api_key=273a918accce07ba36d71cba674bf7972478df34&limit=' + limit + '&offset=' + rand(50).to_s + '&format=json'
json  = Net::HTTP.get_response(URI.parse(url)).body
data  = JSON.parse(json)

data['results'].each do |res|
  p 'Sending ' + res['name'] + ' ....'
end

resp = Net::HTTP.post_form(URI.parse("http://localhost:1000/projects/comic_book_characters"), json)