document.addEventListener('DOMContentLoaded', function() {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    var title = tab.title;

    // 去除两侧空格
    title = title.replace(/^\s*|\s*$/g,"");

    if(url.indexOf("/juejin.im/") != -1){
        title = title.replace(/^[(]\d+[)]/,"");
        title = title.replace(/[-]\s*掘金/,"");
    }else if(url.indexOf("/www.jianshu.com/") != -1){
        title = title.replace(/[-]\s*简书/,"");
    }

    $('input[name="title"').val(title);
    $('input[name="link"').val(url);


    $("#collect").click(function(){

        $.ajax({
            url: "https://www.wanandroid.com/lg/collect/add/json",
            type:"post",
            data:{
                title: $('input[name="title"').val(),
                link: $('input[name="link"').val()
                },
            success: function (results) {
                try{
                    if(results.errorCode != 0){
                        $("#collect").css("color","#de2000");
                        $("#collect").text(results.errorMsg);
                    }else{
                        $("#alertMsg").css("color","#009a61");
                        $("#alertMsg").text("收藏成功!");
                        $("#collect").attr("disabled","disabled");
                    }    
                }catch(e){
                      $("#alertMsg").css("color","#de2000");
                      $("#alertMsg").text("服务器错误!");
                }
                
            },
            error:function(){
                $("#alertMsg").css("color","#de2000");
                $("#alertMsg").text("网络异常!");
            }
        });

    });


    $("#publish").click(function(){

        $.ajax({
            url: "https://www.wanandroid.com/lg/user_article/add/json",
            type:"post",
            data:{
                title: $('input[name="title"').val(),
                link: $('input[name="link"').val()
                },
            success: function (results) {
                try{
                    if(results.errorCode != 0){
                        $("#alertMsg").css("color","#de2000");
                        $("#alertMsg").text(results.errorMsg);
                    }else{
                        $("#alertMsg").css("color","#009a61");
                        $("#alertMsg").text("分享成功!");
                        $("#publish").attr("disabled","disabled");
                    }    
                }catch(e){
                    //$("#publish").css("color","red");
                    $("#alertMsg").css("color","#de2000");
                    $("#alertMsg").text("服务器错误!");
                }
            },
            error:function(e){
                 //$("#publish").css("color","red");
                 $("#alertMsg").css("color","#de2000");
                 $("#alertMsg").text("网络异常!");
            }
        });
    });
 
  });
});



