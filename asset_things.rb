#!/usr/bin/ruby
tags = `git tag --points-at HEAD`

if tags.empty?
  head_revision = `git rev-parse HEAD`
  puts "\033[1;31mNo tags associated with $HEAD_REV. Did you push your commits and tags?\033[0m"
  exit(false)
end

tags
  .split("\n")
  .each do |tag|
    if tag[0] == '@'
      tag = tag[1..-1]
    end

    tag_segments = tag.split("@")
    package_name = tag_segments[0]

    tag_package_version = tag_segments[1]

    begin
      actual_package_version = `node -e "console.log(require('./packages/#{package_name}/package.json').version)"`

      if tag_package_version != actual_package_version
        puts "\033[1;31m#{package_name} is tagged as #{tag_package_version}, but its package.json version is #{actual_package_version}.\033[0m"
        exit(false)
      end
    rescue
      puts "error reading package.json for #{package_name}"
    end
  end

`echo "\033[0;32mAll clear!\033[0m"`
exit(true)
