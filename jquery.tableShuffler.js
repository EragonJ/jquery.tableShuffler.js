(function($){
  
  // Store this in _this
  var _this = null;

  // default option
  var opt = {
    order : "desc",
    sortBy : [0]
  };

  var method = {
    init:function(DOM,options){
      _this = DOM;
      $.extend(opt,options)
    },
    sort:function(){
      // We will get an array of trs
      var trs = $(_this).children("tbody").children("tr");

      // It means that we only have one head and one content
      if(trs.length <= 2)
      {
        return false;
      }
      else
      {
        var trHead = trs[0];
        var trContent = trs.slice(1);
        trContent.sort(function(objA,objB){
          var x = $(objA).children("td:eq("+opt.sortBy+")").html();
          var y = $(objB).children("td:eq("+opt.sortBy+")").html();
          // Sort by ascii code
          if(opt.order.toLowerCase() == "desc")
          {
            return ((x<y) ? 1 : ((x>y) ? -1 : 0));
          }
          else
          {
            return ((x<y) ? -1 : ((x>y) ? 1 : 0));
          }
        });
        $(_this).prepend(trContent).prepend(trHead);
      }
    }
  }

  // Enter point
  $.fn.tableShuffler = function(options){
    method.init(this,options);
    method.sort();
  };

})(jQuery);
