(function($) {
  $.fn.wysiwyg = function(options) {
    var options = $.extend({
      mode : 'lite'
    }, options);
    
    var Menu = {
      width : 405,
      height: 22
    };
    
    var Action = {
      bold: function(obj) {
        obj.execCommand('bold', false, null);
      },
      italic: function(obj) {
        obj.execCommand('italic', false, null);
      },
      underline: function(obj) {
        obj.execCommand('underline', false, null);
      },
      fontsize: function(obj, size) {
        obj.execCommand('fontSize', false, size);
      },
      fontcolor: function(obj, color) {
        obj.execCommand('foreColor', false, color);
      },
      hr: function(obj) {
        obj.execCommand('insertHorizontalRule', false, null);
      },
      ul: function(obj) {
        obj.execCommand("InsertUnorderedList", false,"newUL");
      },
      ol: function(obj) {
        obj.execCommand("InsertOrderedList", false,"newOL");
      },
      link: function(obj, url) {
        obj.execCommand("CreateLink", false, url);
      },
      unlink: function(obj) {
        obj.execCommand("Unlink", false, null);
      },
      image: function(obj, src) {
        if(src != null)
          obj.execCommand('insertimage', false, src);
      }
    };
    
    return this.each(function(i) {
      var $this = $(this);
      
      var $button_bold      = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 12px Arial; font-weight: bold;" title="Bold">B</button>');
      var $button_italic    = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 4px; height: 20px; font: 12px Arial; font-style: italic;" title="Italic">I</button>');    
      var $button_underline = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 12px Arial; text-decoration: underline;" title="Underline">U</button>');    
      
      var $button_fontsize  = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Text Size">Text Size</button>');    
      var $button_fontcolor = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Text Color">Text Color</button>');    
      
      var $button_hr        = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Horizontal Rule">&lt;HR&gt;</button>');    
      var $button_ul        = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Unordered List">&lt;UL&gt;</button>');    
      var $button_ol        = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Ordered List">&lt;OL&gt;</button>');
      
      var $button_link      = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Link">Link</button>');
      var $button_unlink    = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="UnLink">UnLink</button>');
      
      var $button_image     = $('<button style="cursor: default; margin: 0 2px 0 0; text-align: center; padding: 0 3px; height: 20px; font: 11px Arial;" title="Image">Image</button>');
      
      var $wysiwyg = $('<div class="wysiwyg" style="display: inline-block;"></div>');
      var $menu    = $('<div class="wysiwyg-menu" style="white-space: nowrap; width: '+ Menu.width +'; height: '+ Menu.height +'px;"></div>');
      var $iframe  = $('<iframe class="wysiwyg-iframe" frameborder="0" style="border: 1px solid silver;"></iframe>');

      $menu.append($button_bold);
      $menu.append($button_italic);
      $menu.append($button_underline);
      $menu.append($button_fontsize);
      $menu.append($button_fontcolor);
      $menu.append($button_hr);
      $menu.append($button_ul);
      $menu.append($button_ol);
      $menu.append($button_link);
      $menu.append($button_unlink);
      $menu.append($button_image);
      
      $wysiwyg.width(405); // ($this.width() + 150);
      $wysiwyg.height($this.height() + Menu.height);
      $iframe.height($this.height());
      $iframe.width(405 - 2);  // $this.width() + 150 - 2);
      
      $this.hide(0);
      $wysiwyg.append($menu);
      $wysiwyg.append($iframe);
      $wysiwyg.insertAfter($this);

      var iframe = $iframe.get(0);
      iframe.contentDocument.designMode = 'On';
      iframe.contentDocument.body.style.margin  = '0px';
      iframe.contentDocument.body.style.padding = '2px';
      iframe.contentDocument.body.style.font    = '12px Arial';
      
      $button_bold.click(function(evt) { Action.bold(iframe.contentDocument); });
      $button_italic.click(function(evt) { Action.italic(iframe.contentDocument); });
      $button_underline.click(function(evt) { Action.underline(iframe.contentDocument); });
      
      $button_fontsize.click(function(evt) { var size = prompt('Enter size 1-7:', ''); Action.fontsize(iframe.contentDocument, size); });
      $button_fontcolor.click(function(evt) { var color = prompt('Enter color:', '');   Action.fontcolor(iframe.contentDocument, color); });
      
      $button_hr.click(function(evt) { Action.hr(iframe.contentDocument); });
      $button_ul.click(function(evt) { Action.ul(iframe.contentDocument); });
      $button_ol.click(function(evt) { Action.ol(iframe.contentDocument); });
      
      $button_link.click(function(evt) { var url = prompt('Enter URL:', 'http://'); Action.link(iframe.contentDocument, url); });
      $button_unlink.click(function(evt) { Action.unlink(iframe.contentDocument); });
      
      $button_image.click(function(evt) { var url = prompt('Enter iamge location:', ''); Action.image(iframe.contentDocument, url); });
      
      $iframe.ready(function(evt) {
         $(this).click(function() { 
          $this.val(iframe.contentDocument.body.innerHTML);
        });
      });    
    });
  };
})(jQuery);