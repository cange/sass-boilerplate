$(function () {

  'use strict';
  /**
   * Observe the followng special class selectors "-d", "d-", "-d-" and wrapped the elements with a strong tag.
   * @example
   * <div class="-d foo d-">
   *   <span class="-d-">bar</span>
   * </div>
    * <!--result-->
   * &lt;div class="<strong>foo</strong>"&gt;
   *   <strong>&lt;span&gt;bar&lt;/span&gt;</strong>
   * &lt;/div&gt;
   */
  function codeHighlight () {
    $('.doc-example .doc-bd').each(function () {
      var $code = $(this),
        $link = $('<a class="doc_pill" data-label="Hide source">Show source</a>')
      ;
      $link
        .insertAfter($code)
        .click(function () {
          var $this = $(this),
            label = $this.data('label'),
            $temp = $('<pre></pre>')
          ;
          $this
            .data('label', $this.text())
            .text(label)
          ;
          if (! $this.next()[0] || $this.next().is(':not(pre)')) {
            $temp.text($code.html());
            var $pre = $('<pre class="prettyprint"></pre>'),
              html = $.trim($temp.html())
                // remove everything between <!-- |--> and <!--| -->
                .replace(/(.*)(&lt;!-- \|--&gt;\D*&lt;!--\| --&gt;)(.*)/gi, '…')
                // mark everything between .-d and .d- as bold
                .replace(/(-d )(.*)( d-)/g, '<strong>$2</strong>')
                // mark the whole line when this .-d- is defined
                .replace(/&lt;((\S.*)( .*?)(-d-).*)&gt;/g, '&lt;<strong>$1</strong>&gt;')
                // remove indicators
                .replace(/ class="-d-"|-d- | -d-|&amp;nbsp;/g, '')
                // remove indentention
                .replace(/\n.*(&lt;.*&gt;)$/,'\n$1')
            ;
            // triming
            var beginIndex = html.indexOf('&') - 1;
            if (beginIndex > -1) {
              html = html.replace(RegExp(' {' + beginIndex + '}', 'g'), '');
            }
            $pre
              .html($.trim(html))
              .hide()
              .insertAfter($this)
            ;
            prettyPrint();
          }
          $this.next().toggle();
        })
      ;
    });
  }
 codeHighlight();

});

