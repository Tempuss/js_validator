/**
* @brief 프로토콜 체크 함수
* @param {String} s 체크할 프로토콜 문자열
* @return {String} 허가된 프로토콜이면 http://를 추가한 문자열 리턴, 허가되지 않은 프로토콜이면 빈값 리턴
*/
function isValidProtocol(s)
{
    //프로토콜 유무 체크
    var protocol_exist_check = /^(?:(?:\w+):\/\/){1}/;
    //허가된 프로토콜 체크
    var protocol_granted = /^(http|https|ftp?):\/\/([^:\/\s]+)/;

    if (protocol_exist_check.test(s))
    {
        if (!protocol_granted.test(s))
        {
            s = "";
        }
    } else {
        s = "http://" + s;
    }

    return s;
}

/**
* @brief URL 형식인지 체크하는 함수
* @param {String} s URL 형식인지 체크할 문자열
* @return {Bool} url이면 true, 아니면 false
*/
function isUrl(s)
{
    var protocol_regex = /^(?:(?:\w+):\/\/){1}/;
    var granted_protocol = /^(http|https|ftp?):\/\/([^:\/\s]+)/;
    var special_char = /[\.\!\@\#\$\%\^\&\*\(\)\+\~\\\;\[\]\'\,\.\:\/\{\}\\<\>\?\`\|]/;
    var port_regex = /(\:\d+)/;

    var host = "";
    var host_split = [];
    var host_search = [];
    var split_delim = '.';

    //프로토콜 체크 및 없을시 추가
    s = isValidProtocol(s);

    if (s == "")
    {
        //프로토콜 형식 오류
        return false;
    }

    //프토토콜 저장
    var protocol = s.match(protocol_regex);
    //hostname 정보 분리
    var host = s.replace(protocol[0], "");

    //hostname의 마지막이 /인지 ?인지 분리
    if (host.indexOf("/") != -1)
    {
        host_search = host.split("/");
        host = host_search[0];
    }
    //GET 요청 파라미터(?) 분리
    else if (host.indexOf("?") != -1)
    {
        host_search = host.split("?");
        host = host_search[0];
    }

    //.(점) 으로 hostname split 후 개별 레이블 특수문자 체크
    host_split = host.split(split_delim);

    //서브 도메인 depth 체크
    if (host_split.length > 127 || host_split.length == 0)
    {
        return false;
    }

    //최상위 도메인이 없는경우 ex)naver.com -> 정상, navercom->걸림
    if (host_split.length < 2)
    {
        return false;
    }

    //전체 도메인 길이가 253자 이상일 경우 hostname 형식 위반으로 종료
    if (host.length > 253)
    {
        return false;
    }


    //hostname에 허용 안되는 특수문자 포함되는지 확인
    for (var i = 0; i < host_split.length; i++)
    {
        //개별 레이블 개수가 63개 이상일 경우 hostname 형식 위반이므로 종료
        if (host_split[i].length > 63)
        {
            return false;
        }


        //hostname에서 허가되지 않은 특수문자 있는지 체크
        if (special_char.test(host_split[i]))
        {
            if (i != host_split.length - 1)
            {
                //hostname에 허용 안되는 특문 포함
                //허용안되는 특문 포함시 리턴후 메소드 종료
                return false;
            } else {
                //마지막 hostname일 경우 포트 형식이 아니면 오류로 판단
                if (!port_regex.test(host_split[i]))
                {
                    return false;
                }
            }
        }
    }

    //위의 모든 단계 통과시 url 형식으로 판단
    return true;
}


/**
* @brief URL에서 프로토콜 제거하는 함수
* @param {String} s 제거할 URL 문자열
* @return {String} replace 한 문자열
*/
function isUrlProtocolRemove(s)
{
    var regex = /^(?:(ht|f)tp(s?)\:\/\/)?/;
    return s.replace(regex, '');
}