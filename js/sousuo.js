$(function () {/*
    var myScroll;*/
    // myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false,click:true});
    let serch='';
    if(localStorage.history){
        serch=localStorage.history;
        let arr=serch.split(',');
        arr.shift();
        // arr.unshift();
        arr=arr.slice(-4);
        console.log(arr);
        let str='';
        console.log(str);
        arr.forEach(val=>{
            str+=`<span>${val}</span>`
        })
        $('.history').html(str+'<span>历史记录</span>');
    }
    $('#header span').click(function () {
        history.back();
    })
    $('#header input').blur(function () {
        let values = $(this).val();
        if(values==''){
            return;
        }else {
            // if(values!=arr.includes.call(arguments))
            // serch += "," + values;
            // localStorage.history=serch;
            let arr;
            arr = localStorage.history.split(",")
            arr.shift()
            arr=arr.slice(-4)
            let str='';
            if(!arr.includes($(this).val())){
                serch += "," + values;
                localStorage.history=serch;
            }
            console.log(arr[0]);
            arr.forEach(val=> {
                /*if(val==values){
                    $('.history span:contains(val)').remove();
                }*/
                str+=`<span>${val}</span>`
            })
            $('.history').html(str+'<span>历史记录</span>')
        }
        // serch+=','+$(this).val();
        // localStorage.history=serch;
        // 封装添加新闻函数
        // function render(type,repaint=true,start=0) {
            $.ajax({
                url:'https://api.jisuapi.com/news/search?keyword='+values+'&appkey=6b54d90d60aab77d',
                dataType:'jsonp',
                beforeSend:function () {
                    $('#shua').show()
                    $('.history').show();
                    $('#wrapper').hide();
                },
                success:function (res) {
                    console.log(res);
                    $('#shua').hide();
                    $('.history').hide();
                    $('#wrapper').show();
                    let arr = res.result.list;
                    // console.log(arr);
                    let str1="";
                    arr.forEach(val=> {
                        console.log(val.pic);
                        if (val.pic=="") {
                            str1 += `<li class="nopic list">
                                        <a>
                                            <p>${val.title}</p>
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </a>
                                    </li>`;
                        } else {
                            str1 += `<li class="list">
                                        <a>
                                            <div class="left">
                                                <img src="${val.pic}" alt="">
                                            </div>
                                            <div class="right">
                                                <p>${val.title}</p>
                                                <i>${val.time}</i>
                                                <i>${val.src}</i>
                                            </div>
                                        </a>
                                    </li>`;
                        }
                    })
                    $('.listBox').html(str1);
                    $('.listBox').on('click', '.list', function () {
                        let indexsa = $('.list').index(this)
                        // console.log(indexsa);
                        localStorage.val =$(this).val();
                        localStorage.indexsa =indexsa;
                        location.href ='xinwen.html';
                    })
                }
            })
            /*$.ajax({
                url:'https://api.jisuapi.com/news/search?keyword='+$(this).val()+'&appkey=6b54d90d60aab77d',
                dataType:'jsonp',
                success:function (res) {
                    console.log(res);
                }
            })*/
            // }
        //新闻频道
    })

    let values = $('input').val();
        $.ajax({
            url:'https://api.jisuapi.com/news/channel?appkey=6b54d90d60aab77d',
            dataType:'jsonp',
            success:function (res) {
                let arr= res.result;
                console.log(arr);
                let strt = "";
                arr.forEach((val, index) => {
                    if(index==0){
                        strt += `<li class="active">${val}</li>`;
                    }
                    else
                    {
                        strt += `<li>${val}</li>`
                    }
                })
                $('#scroller ul').html(strt);
            }
        })

    $('.history').on('click','span',function () {
        // console.log(1)
        // 删除新闻栏目
        $('#wrapper').remove();
        // 获取输入内容
        let values = $(this).val();
        // 输出搜索新闻
        $.ajax({
            url: "https://api.jisuapi.com/news/search?keyword='+values+'&appkey=6b54d90d60aab77d",
            dataType: 'jsonp',
            beforeSend:function () {
                $('#shua').show()
                $('.history').show();
                $('#wrapper').hide();
            },
            success:function (res) {
                console.log(res);
                $('#shua').hide();
                $('.history').hide();
                $('#wrapper').show();
                let arr = res.result.list;
                // console.log(arr);
                let str1="";
                arr.forEach(val=> {
                    console.log(val.pic);
                    if (val.pic=="") {
                        str1 += `<li class="nopic list">
                                        <a>
                                            <p>${val.title}</p>
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </a>
                                    </li>`;
                    } else {
                        str1 += `<li class="list">
                                        <a>
                                            <div class="left">
                                                <img src="${val.pic}" alt="">
                                            </div>
                                            <div class="right">
                                                <p>${val.title}</p>
                                                <i>${val.time}</i>
                                                <i>${val.src}</i>
                                            </div>
                                        </a>
                                    </li>`;
                    }
                })
                $('.listBox').html(str1);
                $('.listBox').on('click', '.list', function () {
                    let indexsa = $('.list').index(this)
                    console.log(indexsa)
                    localStorage.val =$(this).val();
                    localStorage.indexsa = indexsa;
                    location.href ='xinwen.html';
                })
            }
        })
    })



})
