require 'nokogiri'

module Jekyll

  module ImagePreview

    def imgprev(content)
      doc = Nokogiri::HTML.fragment(content)
      #doc.css('img').each do |img|
      #  return img
      #end
      #return doc # | strip_html | truncatewords:75
      return doc.first_element_child;
    end

  end

end

Liquid::Template.register_filter(Jekyll::ImagePreview)