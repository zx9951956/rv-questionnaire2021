var btnLeft = document.getElementById('button-left')
var btnRight = document.getElementById('button-right')
var submit = document.getElementById('submit')
var progressBar = document.getElementById('progressBar')
var degreeOfCompletion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var nowPage = 1
$('#submit').on('click', function () {
    var state = 0
    // 性別
    var sex = function () {
        var temp;
        $('[name="sex"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //年齡
    var year = function () {
        var temp;
        $('[name="year"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //居住地
    var place = function () {
        var temp;
        $('[name="place"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //遊玩次數
    var time = function () {
        var temp;
        $('[name="time"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    var exhibitionHall = function () {
        var temp;
        $('[name="exhibitionHall"]').each(function (i) {
            if ($(this).prop('checked') === true) {
                if (i == 0) {
                    temp = $(this).val();
                } else {
                    if (temp == null) {
                        temp = $(this).val();
                    } else {
                        temp += (',' + $(this).val());
                    }
                }
            }

        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //是否再來
    var come = function () {
        var temp;
        $('[name="come"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //是否聽懂導覽
    var understand = function () {
        var temp;
        $('[name="understand"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //是否分享
    var share = function () {
        var temp;
        $('[name="share"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //是否有趣
    var interesting = function () {
        var temp;
        $('[name="interesting"]').each(function () {
            if ($(this).prop('checked') === true) temp = $(this).val();
        });
        if (temp == null) {
            state = 1
        }
        return temp;
    };
    //建議
    var suggest = function () {
        var temp = $('[name="suggest"]').val();
        if (temp == "") {
            state = 1
        }
        return temp;
    };
    // post
    var data = {
        'entry.678731899': sex(),
        'entry.985182338': year(),
        'entry.299271935': place(),
        'entry.1801503054': time(),
        'entry.1739358294': exhibitionHall(),
        'entry.509556683': come(),
        'entry.377136009': understand(),
        'entry.859527971': share(),
        'entry.1560278706': interesting(),
        'entry.1950067070': suggest()

    };

    if (state == 0) {
        
        $.ajax({
            type: 'POST',
            url: 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSfEJDd1XawO8NXaYVgR6rtUqQkBJvs9eM09iE0o6nwsOp89tA/formResponse',
            data: data,
            contentType: 'application/json',
            dataType: 'jsonp',
            complete: function () {
                window.location.assign('./final.html')
            }
        });
    } else {
        console.log('test')
    }
    
    
});

$(document).ready(function () {
    submit.disabled = true
    btnLeft.disabled = true
    btnRight.disabled = true
    SetProgressBar()
    for (i = 0; i < 11; i++) {
        $(".problem:nth-child(" + (i + 1) + ")").css({
            "transform": "translateX(" + (100 * i) + "vw)",
            "transition": "all 0.5s"
        })
    }
});
var changeColor = function (type) {
    var tempI;
    $('[name="'+type+'"]').each(function (i) {
        if ($(this).prop('checked') === true) tempI = i;
    });

    var temp = document.getElementsByClassName('problem-'+ type)
    
    if(type == 'exhibitionHall'){
        $('[name="'+type+'"]').each(function (i) {
            if ($(this).prop('checked') === true) {
                temp[i].style.background ="#c3fff0"
            }
            else{
                temp[i].style.background ="rgb(233, 255, 250)"
                
            }
        });
       
    }
    else{
        for(var j = 0; j<temp.length;j++){
            if(j == tempI){
                temp[j].style.background ="#c3fff0"
            }
            else{
                temp[j].style.background ="rgb(233, 255, 250)"
            }
        }
    }
}
var GetDegreeOfCompletion = function () {
    var temp = 0;
    for (i = 0; i < degreeOfCompletion.length; i++) {
        temp += degreeOfCompletion[i]
    }
    return temp
}

var SetProgressBar = function () {
    progressBar.style.width = GetDegreeOfCompletion() * 10 + "%"
}
var chooseAnswer = function (index) {
    var temp = 0
    if(index == 10 && degreeOfCompletion[index - 2] == 0){
        nowPage += 2
        degreeOfCompletion[index - 2] = 1
        degreeOfCompletion[index - 1] = 1

            btnDisabled(nowPage)
            SetProgressBar()
            setTimeout("changePage()", 750)
    }
    else{
        if (degreeOfCompletion[index - 1] == 0) {
            nowPage++
            degreeOfCompletion[index - 1] = 1
            btnDisabled(nowPage)
            SetProgressBar()
            setTimeout("changePage()", 750)
    
        }
    }
}
var getStr = function (index, id) {
    var str = document.getElementById(id).value

    if (degreeOfCompletion[index - 1] == 0 && str != "") {
        nowPage++
        degreeOfCompletion[index - 1] = 1
        btnDisabled(nowPage)
        SetProgressBar()
        setTimeout("changePage()", 750)
    }
}
var chooseCheckBox = function (index) {
    var temp = 0
    $('[name="exhibitionHall"]').each(function (i) {
        if ($(this).prop('checked') === true) {
            temp++
        }
    });
    if (degreeOfCompletion[index - 1] == 0) {
        degreeOfCompletion[index - 1] = 1
        btnDisabled(nowPage)
        SetProgressBar()
    } else if (temp == 0) {
        degreeOfCompletion[index - 1] = 0
        btnRight.disabled = true
        SetProgressBar()
    }
    if(temp != 0){
        document.getElementById('next').style.display = "flex"
    }
    else{
        document.getElementById('next').style.display = "none"
    }
}

var changePage = function () {
    for (i = 0; i < 11; i++) {
        temp = i + 1
        $(".problem:nth-child(" + temp + ")").css({
            "transform": "translateX(" + (100 * temp - 100 * nowPage) + "vw)",
            "transition": "all 0.5s"
        })
    }
    if (nowPage == 11) {
        submit.disabled = false
    }
}
$('#button-left').on('click', function () {
    nowPage--
    btnDisabled(nowPage)
    var temp = 0
    setTimeout("changePage()", 0)
});

$('#button-right').on('click', function () {
    nowPage++
    btnDisabled(nowPage)
    var temp = 0
    setTimeout("changePage()", 0)
});
$('#button-next').on('click', function () {
    nowPage++
    btnDisabled(nowPage)
    var temp = 0
    setTimeout("changePage()", 0)
});
var btnDisabled = function (now) {
    if (now == 1) {
        btnLeft.disabled = true
        if (degreeOfCompletion[now - 1] == 1 || now == GetDegreeOfCompletion()) {
            btnRight.disabled = false
        } else {
            btnRight.disabled = true
        }
    } else if (now == 11) {
        btnRight.disabled = true
    } else {
        if (degreeOfCompletion[now - 2] == 1) {
            btnLeft.disabled = false
        }
        if (degreeOfCompletion[now] == 1 || now == GetDegreeOfCompletion()) {
            btnRight.disabled = false
        } else {
            btnRight.disabled = true
        }
    }
}
