/**
* @brief �������� üũ �Լ�
* @param {String} s üũ�� �������� ���ڿ�
* @return {String} �㰡�� ���������̸� http://�� �߰��� ���ڿ� ����, �㰡���� ���� ���������̸� �� ����
*/
function isValidProtocol(s)
{
    //�������� ���� üũ
    var protocol_exist_check = /^(?:(?:\w+):\/\/){1}/;
    //�㰡�� �������� üũ
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
* @brief URL �������� üũ�ϴ� �Լ�
* @param {String} s URL �������� üũ�� ���ڿ�
* @return {Bool} url�̸� true, �ƴϸ� false
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

    //�������� üũ �� ������ �߰�
    s = isValidProtocol(s);

    if (s == "")
    {
        //�������� ���� ����
        return false;
    }

    //�������� ����
    var protocol = s.match(protocol_regex);
    //hostname ���� �и�
    var host = s.replace(protocol[0], "");

    //hostname�� �������� /���� ?���� �и�
    if (host.indexOf("/") != -1)
    {
        host_search = host.split("/");
        host = host_search[0];
    }
    //GET ��û �Ķ����(?) �и�
    else if (host.indexOf("?") != -1)
    {
        host_search = host.split("?");
        host = host_search[0];
    }

    //.(��) ���� hostname split �� ���� ���̺� Ư������ üũ
    host_split = host.split(split_delim);

    //���� ������ depth üũ
    if (host_split.length > 127 || host_split.length == 0)
    {
        return false;
    }

    //�ֻ��� �������� ���°�� ex)naver.com -> ����, navercom->�ɸ�
    if (host_split.length < 2)
    {
        return false;
    }

    //��ü ������ ���̰� 253�� �̻��� ��� hostname ���� �������� ����
    if (host.length > 253)
    {
        return false;
    }


    //hostname�� ��� �ȵǴ� Ư������ ���ԵǴ��� Ȯ��
    for (var i = 0; i < host_split.length; i++)
    {
        //���� ���̺� ������ 63�� �̻��� ��� hostname ���� �����̹Ƿ� ����
        if (host_split[i].length > 63)
        {
            return false;
        }


        //hostname���� �㰡���� ���� Ư������ �ִ��� üũ
        if (special_char.test(host_split[i]))
        {
            if (i != host_split.length - 1)
            {
                //hostname�� ��� �ȵǴ� Ư�� ����
                //���ȵǴ� Ư�� ���Խ� ������ �޼ҵ� ����
                return false;
            } else {
                //������ hostname�� ��� ��Ʈ ������ �ƴϸ� ������ �Ǵ�
                if (!port_regex.test(host_split[i]))
                {
                    return false;
                }
            }
        }
    }

    //���� ��� �ܰ� ����� url �������� �Ǵ�
    return true;
}


/**
* @brief URL���� �������� �����ϴ� �Լ�
* @param {String} s ������ URL ���ڿ�
* @return {String} replace �� ���ڿ�
*/
function isUrlProtocolRemove(s)
{
    var regex = /^(?:(ht|f)tp(s?)\:\/\/)?/;
    return s.replace(regex, '');
}