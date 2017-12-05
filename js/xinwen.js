$(function () {
    $(document).ajaxSend(function () {

        $('#shua').show()

    })
    $(document).ajaxSuccess(function () {
        $('#shua').hide()

    })
    $('.back').click(function () {
        history.back()
    })

    let valuesa=localStorage.val;
    let indexsa=localStorage.indexsa;
    // console.log(channel,index)
    $.ajax({
        url: "https://api.jisuapi.com/news/search?keyword=" + valuesa + "&appkey=3732400a5ce14b54",
        dataType:'jsonp',
        success:function (res) {
            let str = "";
            let str1='';
            let nav = res.result.list[indexsa].content

            let src=res.result.list[indexsa].src
            // console.log(nav.src())
            str1=`<span>${src}</span>`

            $('#xiangqing').html(nav)
            $('.headspan').html(str1)

        }


    })



})

